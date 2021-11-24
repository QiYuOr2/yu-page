// export * from './components'

import { request } from './request';
import { ComponentDto, StyleDto } from '@/types/dto';

export function fetchComponents() {
  return request<ComponentDto[]>('components');
}

export function fetchCommonStyles() {
  return request<StyleDto[]>('commonStyles');
}
