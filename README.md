## Макет

https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat


## Live demo

https://step-1-demo.onrender.com/

## Запуск проекта

1. `npm i` — установка зависимостей проекта.
2. `npm run start` — команда, запускающая проект.
2. `npm run dev` — запуск отладочной версии.
3. Проект работает на `http://localhost:3000`.

## Линтинг

- `npm run eslint` — проверка скриптов.
- `npm run stylelint` — проверка стилей.
- `npm run lint` — запуск всех проверок: TS, eslint, stylelint.

## Какие страницы свёрстаны:

- Логин
- Регистрация
- Страница чата
- Страница с ошибкой
- Меню добавления пользователя (в шапке чата)
- Диалог заливки картинки (с выбором файла)
- Диалог добавления пользователя
- Страница профиля (cсылка на профиль в шапке чата)
- Изменить данные в профиле
- Изменить пароль в профиле

## Подключена валидация форм

- На странице логина
- На экране регистрации

Навигация по страницам сделена на EventBus

## Использованы

[Vite](https://vitejs.dev/)
[Handlebars](https://handlebarsjs.com/)
[sass/scss](https://sass-lang.com/)
[eslint](https://eslint.org/)
[stylelint](https://stylelint.io/)
