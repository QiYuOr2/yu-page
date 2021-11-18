// export * from './components'

import { request } from './request';

export function fetchComponents() {
  return request('components');
}

export function fetchCommonStyles() {
  return request('commonStyles');
}
