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
    [ /^\s+$/, true, 'Не указан логин' ],
    [ /^.{3,20}$/, false, 'Длина логина не может быть меньше 3 или больше 20 символов' ],
    [ /^\d+$/, true, 'Логин не может состоять только из цифр' ],
    [ /\s/, true, 'Логин не может содержать пробелы' ],
    [ /^[-_A-Z0-9]+$/i, false, 'Разрешены только числа, латиница и "_", "-"' ]
  ]);
}

export function password(value: string) {
  console.log(value);
}
