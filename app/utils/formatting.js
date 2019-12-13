const FRIEND_CODE_3DS_REGEX = /(\d{4})(?=\d)/g;
const FRIEND_CODE_SWITCH_REGEX = /(^[a-zA-Z]{2}|\d{4})(?=\d)/g;

export function capitalize (input) {
  return input.replace(/([^\W_]+[^\s-]*) */g, (word) => word[0].toUpperCase() + word.substr(1).toLowerCase());
}

export function decimal (number, precision) {
  return number.toFixed(precision);
}

export function friendCode3DS (code) {
  return code && code.replace(FRIEND_CODE_3DS_REGEX, '$1-');
}

export function friendCodeSwitch (code) {
  if (!code) {
    return code;
  }

  code = code.toUpperCase();

  // Allow the user to type in `SW-`, but if they start typing something else
  // in, force `SW-` in front of whatever it was that they were typing. This
  // will make it so that if they follow the formatting rules, nothing will
  // self-correct, but if they don't, it will.
  ['S', 'W', '-'].forEach((letter, i) => {
    if (code[i] && code[i] !== letter) {
      code = code.slice(0, i) + letter + code.slice(i);
    }
  });

  return code.replace(FRIEND_CODE_SWITCH_REGEX, '$1-');
}

export function padding (number, digits, value = '0') {
  return `${value.repeat(digits)}${number}`.slice(-1 * digits);
}
