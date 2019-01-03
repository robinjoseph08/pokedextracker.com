const FRIEND_CODE_3DS_REGEX = /(\d{4})(?=\d)/g;
const FRIEND_CODE_SWITCH_REGEX = /(^[a-zA-Z]{2}|\d{4})(?=\d)/g;

export function capitalize (input) {
  return input.replace(/([^\W_]+[^\s-]*) */g, (word) => word[0].toUpperCase() + word.substr(1).toLowerCase());
}

export function decimal (number, precision) {
  return number.toFixed(precision);
}

export function dollar (amount) {
  const str = `${amount}`;
  const number = parseFloat(str.replace(/[^\d\.]/g, ''));

  if (isNaN(number)) {
    return '$';
  }

  return `$${decimal(number, 2)}`;
}

export function friendCode3DS (code) {
  return code && code.replace(FRIEND_CODE_3DS_REGEX, '$1-');
}

export function friendCodeSwitch (code) {
  return code && code.replace(FRIEND_CODE_SWITCH_REGEX, '$1-');
}

export function padding (number, digits, value = '0') {
  return `${value.repeat(digits)}${number}`.slice(-1 * digits);
}
