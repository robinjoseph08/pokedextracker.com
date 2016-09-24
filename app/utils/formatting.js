export function capitalize (input) {
  return input.replace(/([^\W_]+[^\s-]*) */g, (word) => word[0].toUpperCase() + word.substr(1).toLowerCase());
}

export function decimal (number, percision) {
  return parseInt(number * percision * 10, 10) / (percision * 10);
}

export function padding (number, digits, value = '0') {
  return `${value.repeat(digits)}${number}`.slice(-1 * digits);
}
