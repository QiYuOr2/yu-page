export const isEmpty = <T>(target: T) => {
  if (typeof target === 'undefined') {
    return true;
  }
  if (typeof target === 'string' && target === '') {
    return true;
  }
  if (typeof target === 'object' && (Object.keys(target).length === 0 || target === null)) {
    return true;
  }
  if (typeof target === 'number' && isNaN(target)) {
    return true;
  }
  return false;
};
