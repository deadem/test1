import Handlebars from 'handlebars';

export abstract class Block {
  public id = ++Block.currentIdCounter; // Идентификатор текущего компонента. Используется во время рендеринга для подстановки дочерних компонентов.

  protected abstract template: string; // Handlebars-шаблон текущего компонента.
  protected props: Record<string, unknown> = {}; // Свойства компонента. Будут переданы в шаблон во время рендеринга

  private static currentIdCounter = 0; // Счётчик. Нужен для уникального идентификатора при создании дочерних компонентов
  private children: Record<string, Block> = {}; // как таковой не нужен, храним только для того, чтобы было у кого вызывать unmount
  private element: Element | null = null; // Элемент в DOM, в который отрендерен этот компонент

  constructor(props: Record<string, unknown>) {
    this.props = props;
  }

  public setProps(props: Record<string, unknown>) {
    this.props = props;
    this.render();
  }

  public render() {
    const fragment = this.compile();

    if (this.element) {
      this.element.replaceWith(fragment);
    } else {
      this.element = fragment;
    }
  }

  public content(): HTMLElement {
    if (!this.element) {
      this.render();
    }
    return this.element as HTMLElement;
  }

  protected compile() {
    const context = { ...this.props };
    const html = Handlebars.compile(this.template)(context);
    this.children = context.children as Record<string, Block> || {};

    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    // Ищем среди детей плейсхолдеры для размещения компонентов и заменяем заглушки на реальные компоненты
    Object.values(this.children).forEach((component) => {
      const placeholder = fragment.querySelector(`[data-id="${component.id}"]`);
      if (!placeholder) {
        throw new Error(`Can't find data-id for component ${component}`);
      }

      const element = component.content();
      element.append(...Array.from(placeholder.childNodes));
      placeholder.replaceWith(element);
    });

    if (!fragment.firstElementChild || fragment.firstElementChild?.nextElementSibling) {
      console.error(fragment);
      throw Error('Only one root supported');
    }

    return fragment.firstElementChild;
  }
}
