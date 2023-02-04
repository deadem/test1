import { AuthController } from '../controllers/AuthController';
import { Page } from './Navigation';
import { Middleware } from './Router';

// Мидлварь для проверки авторизации. Закрывает доступ к страницам, пока не пройдена авторизация
export const authorized: Middleware = (router, next) => {
  const controller = new AuthController();

  // Если авторизация уже состоялась, открываем страницу, иначе - редирект на логин
  if (controller.isAuthorized()) {
    return next();
  }

  router.go(Page.login);
};

// Мидлварь для начальной инициализации. Получает текущее состояние авторизованности и отправляет уже авторизованных на страницу чата
export const checkauth: Middleware = (router, next) => {
  const controller = new AuthController();
  // Если авторизация уже состоялась - перебрасываем на страницу чатов
  if (controller.isAuthorized()) {
    router.go(Page.chat);
  }

  controller.updateState().then(() => {
    if (controller.isAuthorized()) {
      router.go(Page.chat);
    } else {
      // Если состояние обновили, но пользователь всё ещё не авторизован
      next();
    }
  }).catch(() => {
  // В случае любой ошибки просто открываем целевую страницу
    next();
  });
};
