import { AuthController } from '../controllers/AuthController';
import { Page } from './Navigation';
import { Middleware } from './Router';

// Мидлварь для проверки авторизации. Закрывает доступ к страницам, пока не пройдена авторизация
export const authorized: Middleware = (router, next) => {
  const controller = new AuthController();

  // Если мы авторизованы, открываем страницу, иначе - редирект на логин
  if (controller.isAuthorized()) {
    return next();
  }

  router.go(Page.login);
};

// Проверим наличие авторизации. Если её нет, отправим запрос на сервер за проверкой авторизации, а по результатам продолжим
export const tryToAuth: Middleware = (_router, next) => {
  const controller = new AuthController();

  // Если авторизация уже состоялась, продолжаем, иначе пробуем сходить за статусом авторизованности в API
  if (controller.isAuthorized()) {
    return next();
  }

  controller.initUserData().finally(() => {
    next();
  });
};

// Мидлварь для начальной инициализации индексной страницы.
// Получает текущее состояние авторизованности и отправляет уже авторизованных на страницу чата
export const checkIndex: Middleware = (router, next) => {
  const controller = new AuthController();
  // Если авторизация уже состоялась - перебрасываем на страницу чатов
  if (controller.isAuthorized()) {
    router.go(Page.chat);
    return;
  }

  next();
};
