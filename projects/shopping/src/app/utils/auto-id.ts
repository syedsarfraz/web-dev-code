let id = 0;

export function autoId(prefix = '') {
  return `${prefix}${id++}`;
}
