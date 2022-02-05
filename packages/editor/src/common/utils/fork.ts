export function fork<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
