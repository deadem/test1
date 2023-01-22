import Handlebars, { HelperOptions } from 'handlebars';

interface BlockComponent<T> {
  new (props: unknown): T;
  content(): Element;
}

type StaticMethods = {
  componentName: string;
};

export function compile(template: string, context: object) {
  // Ожидаем, что родитель после создания вызовет у каждого children метод embed для встраивания сгенерированнной разметки в реальный DOM
  const data = {
    ...context,
    __children: [] as Array<{ component: unknown, embed(node: DocumentFragment): void }>,
    __refs: {} as Record<string, unknown>
  };
  const html = Handlebars.compile(template)(data);
  return { html, children: data.__children, refs: data.__refs };
}

let uniqueId = 0; // Идентификатор текущего компонента. Используется во время рендеринга для подстановки дочерних компонентов.

export function registerComponent<T extends BlockComponent<T>, P extends object>(Component: { new (props: P): InstanceType<T> } & StaticMethods) {
  Handlebars.registerHelper(Component.componentName, function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);
      const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;

      if ('ref' in hash) {
        // если в свойствах компонента кто-то хочет получить на него ссылку - сохраним
        (data.root__refs = data.root.__refs || {})[hash.ref] = component;
      }

      (data.root.__children = data.root.__children || []).push({ component, embed(node: DocumentFragment) {
        // Ищем среди детей плейсхолдеры для размещения компонентов и заменяем заглушки на реальные компоненты
        const placeholder = node.querySelector(`[${dataAttribute}]`);
        if (!placeholder) {
          throw new Error(`Can't find data-id for component ${Component.componentName}`);
        }

        const element = component.content();
        element.append(...Array.from(placeholder.childNodes));
        placeholder.replaceWith(element);
      }});

      // NB: Не поддерживается перерендер компонентов с детьми, вида {{#A ...}} ... {{/A}}
      const contents = fn ? fn(this) : '';
      return `<div ${dataAttribute}>${contents}</div>`;
    },
  );
}

export function registerHelpers() {
  Handlebars.registerHelper('append', (str, suffix) => String(str) + suffix);
}

export function registerPartial(name: string, component: string) {
  Handlebars.registerPartial(name, component);
}
