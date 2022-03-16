export * from './el';
export * from './fork';
export * from './storage';
export * from './time';

export const pick = (target: Record<string, any>, ...keys: string[]) => {
  return Object.keys(target).reduce((result, current) => {
    if (keys.includes(current)) {
      result[current] = target[current];
    }
    return result;
  }, {} as Record<string, any>);
};
