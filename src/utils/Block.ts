import { compile } from '../handlebars';

export abstract class Block {
  protected abstract template: string; // Handlebars-шаблон текущего компонента.
  protected props: Record<string, unknown> = {}; // Свойства компонента. Будут переданы в шаблон во время рендеринга

  private children: Block[] = []; // как таковой не нужен, храним только для того, чтобы было у кого вызывать unmount
  private element: Element | null = null; // Элемент в DOM, в который отрендерен этот компонент

  constructor(props: Record<string, unknown>) {
    this.props = props;
  }

  public setProps(props: Record<string, unknown>) {
    this.props = props;
    this.render();
  }

  public test() {
    return this.children;
  }

  private render() {
    const fragment = this.compile();

    if (this.element) {
      this.element.replaceWith(fragment);
    }
    this.element = fragment;
  }

  public content(): HTMLElement {
    if (!this.element) {
      this.render();
    }
    return this.element as HTMLElement;
  }

  protected compile() {
    const { html, children } = compile(this.template, this.props);
    this.children = children.map(child => child.component);

    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;
    children.forEach(child => child.embed(fragment));

    if (!fragment.firstElementChild || fragment.firstElementChild?.nextElementSibling) {
      console.error(fragment);
      throw Error('Only one root supported');
    }

    return fragment.firstElementChild;
  }
}
