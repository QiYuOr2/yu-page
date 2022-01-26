export function fork(obj) {
  return JSON.parse(JSON.stringify(obj));
}
