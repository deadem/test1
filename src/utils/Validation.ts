type Rule = [ RegExp, boolean, string ];
type Rules = Rule[];

function check(value: string, rules: Rules) {
  for (let i = 0; i < rules.length; ++i) {
    const [ reg, condition, message ] = rules[i];
    if ((value.search(reg) >= 0) == condition) {
      return message;
    }
  }
}

export function login(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указан логин' ],
    [ /^.{3,20}$/, false, 'Длина логина не может быть меньше 3 или больше 20 символов' ],
    [ /^\d+$/, true, 'Логин не может состоять только из цифр' ],
    [ /\s/, true, 'Логин не может содержать пробелы' ],
    [ /^[-_A-Z0-9]+$/i, false, 'Разрешены только числа, латиница и "_", "-"' ]
  ]);
}

export function password(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указан пароль' ],
    [ /^.{8,40}$/, false, 'Длина пароля не может быть меньше 8 или больше 40 символов' ],
    [ /^(?=.*?[A-Z]).*\d/, false, 'Обязательна хотя бы одна заглавная буква и цифра' ],
  ]);
}

export function email(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указана почта' ],
    [ /^[-A-Z0-9.@"'!@#$%^&*()]+$/i, false, 'Допустима только латиница, цифры и спецсимволы' ],
    [ /@/, false, 'Обязательна @' ],
    [ /@.*?[A-Z].*?\./i, false, 'Обязателен домен с точкой' ],
  ]);
}

export function name(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указано имя' ],
    [ /^[-A-ZА-ЯЁ]+$/i, false, 'Допустима только латиница или кириллица, без пробелов' ],
    [ /^[A-ZА-ЯЁ]/, false, 'Первая буква должна быть заглавной' ],
  ]);
}

export function surname(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указана фамилия' ],
    [ /^[-A-ZА-ЯЁ]+$/i, false, 'Допустима только латиница или кириллица, без пробелов' ],
    [ /^[A-ZА-ЯЁ]/, false, 'Первая буква должна быть заглавной' ],
  ]);
}

export function phone(value: string) {
  return check(value.trim(), [
    [ /^\s*$/, true, 'Не указан телефон' ],
    [ /^\+?[0-9]+$/, false, 'Допустимы только цифры (может начинаться с плюса)' ],
    [ /^\+?[0-9]{10,15}$/, false, 'Длина телефона не может быть меньше 10 или больше 15 символов' ],
  ]);
}
