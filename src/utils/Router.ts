import { Block } from './Block';

export type Middleware = (router: Router, next: () => void) => void;

class Route {
  private readonly path: string | RegExp;
  private readonly title: string;
  private readonly block: new (props: object) => Block<object>;
  private readonly middleware: Middleware;
  private destroyCallback: (() => void) | undefined;

  constructor(path: string | RegExp, title: string, block: typeof Block, middleware: Middleware = (_router, next) => next()) {
    this.path = path;
    this.title = title;
    this.block = block as typeof this.block;
    this.middleware = middleware;
  }

  public match(path: string): boolean {
    if (typeof this.path == 'string') {
      return this.path == path;
    }

    return !!path.match(this.path);
  }

  public render(element: Element, router: Router) {
    this.middleware(router, () => {
      const content = new this.block({});

      document.title = this.title;
      element.innerHTML = '';
      element.append(content.element());

      this.destroyCallback = content.destroy.bind(content);
    });
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

  public use<T extends Constructor<Block<object>>>(path: string | RegExp, title: string, block: T, middleware?: Middleware) {
    this.routes.push(new Route(path, title, block as typeof Block, middleware));

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
    route.render(this.rootMountPoint, this);
  }
}

const router = new Router();
export { router as Router};
