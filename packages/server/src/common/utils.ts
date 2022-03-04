import * as Jwt from 'jsonwebtoken';

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

export const genJwt = (id: number, account: string) => {
  return Jwt.sign({ id, account }, 'qiyuor2', { expiresIn: 3600 * 24 * 3 });
};
