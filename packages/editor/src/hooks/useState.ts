import { fork } from '@/common/utils';
import { reactive } from 'vue';

/**
 * 封装reactive
 * @param initial 初始数据
 */
export function useState<T extends Record<string, any>>(
  initial: T
): [T, (state: Partial<T>) => void];

export function useState(initial: any = {}) {
  const state = reactive(fork(initial));
  const setState = (states: { [x: string]: any }) => {
    Object.keys(states).forEach((key) => {
      state[key] = states[key];
    });
  };
  return [state, setState];
}
