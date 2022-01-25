import { Router } from 'express';

export const createRouter = (prefix: string, callback: (r: Router) => void) => {
  const r = Router();

  callback(r);

  return Router().use(prefix, r);
};
