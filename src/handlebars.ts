import Handlebars, { HelperOptions } from "handlebars";

interface BlockComponent {
  id: number;
  render(): void;
}

export function registerComponent<T extends BlockComponent>(Component: { new (...args: Record<string, unknown>[]): T }) {
  Handlebars.registerHelper(Component.name,
    function (this: unknown, { hash, data }: HelperOptions) {
      const component = new Component(hash);
      component.render();
      (data.root.children = data.root.children || {})[component.id] = component;
      return `<div data-id="${component.id}"></div>`;
    },
  );
}

export function registerHelpers() {
  Handlebars.registerHelper('append', (str, suffix) => String(str) + suffix);
}
