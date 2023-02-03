import { Block } from './Block';

class Route {
  private readonly path: string;
  private readonly title: string;
  private readonly block: new (props: object) => Block<object>;
  private destroyCallback: (() => void) | undefined;

  constructor(path: string, title: string, block: typeof Block) {
    this.path = path;
    this.title = title;
    this.block = block as typeof this.block;
  }

  public match(path: string) {
    return this.path == path;
  }

  public render(element: Element) {
    const content = new this.block({});

    document.title = this.title;
    element.innerHTML = '';
    element.append(content.element());

    this.destroyCallback = content.destroy.bind(content);
  }

  public leave() {
    this.destroyCallback?.();
    this.destroyCallback = undefined;
  }
}

class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private readonly history = window.history;
  private readonly rootMountPoint: Element;

  constructor(mountPoint: Element = document.body) {
    this.rootMountPoint = mountPoint;
  }

  public use<T extends Constructor<Block<object>>>(path: string, title: string, block: T) {
    this.routes.push(new Route(path, title, block as typeof Block));

    return this;
  }

  public start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this.renderPage(target.location.pathname);
    });

    this.renderPage(window.location.pathname);
  }

  public go(path: string) {
    this.history.pushState({}, '', path);
    this.renderPage(path);
  }

  private findRoute(path: string) {
    return this.routes.find(route => route.match(path));
  }

  private renderPage(path: string) {
    const route = this.findRoute(path);

    if (!route) {
      throw new Error('Can\'t find route');
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render(this.rootMountPoint);
  }
}

const router = new Router();
export { router as Router};
