import { request } from "./request";

export function fetchComponents() {
  return request('components')
}
