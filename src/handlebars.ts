import Handlebars, { HelperOptions } from 'handlebars';

interface BlockComponent {
  id: number;
  render(): void;
}

export function registerComponent<T extends BlockComponent>(Component: { new (...args: Record<string, unknown>[]): T }) {
  Handlebars.registerHelper(Component.name,
    function (this: unknown, { hash, data, fn }: HelperOptions) {
      const component = new Component(hash);
      (data.root.children = data.root.children || {})[component.id] = component;
      const contents = fn ? fn(this) : '';
      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}

export function registerHelpers() {
  Handlebars.registerHelper('append', (str, suffix) => String(str) + suffix);
}
