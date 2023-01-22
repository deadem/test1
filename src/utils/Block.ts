import { compile } from './handlebars';

export abstract class Block<Props extends object> {
  protected abstract template: string; // Handlebars-шаблон текущего компонента.
  protected props = {} as Props; // Свойства компонента. Будут переданы в шаблон во время рендеринга

  private children: Block<object>[] = []; // как таковой не нужен, храним только для того, чтобы было у кого вызывать unmount
  private refs = {} as Record<string, Element>; // ссылки на элементы внутри поддерева
  private element: Element | null = null; // Элемент в DOM, в который отрендерен этот компонент

  constructor(props: Props) {
    this.props = props;
  }

  public setProps(props: Props) {
    this.props = props;
    this.render();
  }

  public content(): Element {
    if (!this.element) {
      this.render();
    }
    return this.element as Element;
  }

  protected ref(ref: string) {
    return this.refs[ref];
  }

  // Автоматически вызываемые методы компонента: componentDidMount, componentWillUnmount
  protected componentDidMount() {
    // Метод будет вызван при встраивании компонента в DOM. На момент вызова уже всё встроено, DOM готов и доступен
  }

  protected componentWillUnmount() {
    // Метод будет вызван при удалении компонента в DOM. На момент вызова DOM ещё есть. Это последний шанс почистить за собой
  }

  private render() {
    this.componentWillUnmount();
    this.children.reverse().forEach(child => child.componentWillUnmount()); // вызываем очистку в порядке, обратном созданию

    const fragment = this.compile();

    if (this.element) {
      this.element.replaceWith(fragment);
    }
    this.element = fragment;
    this.componentDidMount();
  }

  private compile() {
    const { html, children } = compile(this.template, this.props);
    this.children = children.map(child => child.component as Block<object>);

    const templateElement = document.createElement('template');
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    // Инициализация списка ссылок на элементы
    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce((list, element) => {
      list[element.getAttribute('ref') as string] = element as HTMLElement;
      element.removeAttribute('ref');
      return list;
    }, {} as Record<string, HTMLElement>);

    children.forEach(child => child.embed(fragment));

    if (!fragment.firstElementChild || fragment.firstElementChild?.nextElementSibling) {
      console.error(fragment);
      throw Error('Only one root supported');
    }

    return fragment.firstElementChild;
  }
}
