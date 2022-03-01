import { Router } from 'express';

export const createRouter = (prefix: string, callback: (r: Router) => void) => {
  const r = Router();

  Reflect.defineProperty(r, 'comment', {
    value(comment: string) {
      this.stack[this.stack.length - 1].route.comment = comment;
      return r;
    },
  });

  callback(r);

  const router = Router().use(prefix, r);

  const pathTable = [];

  router.stack.forEach((rr) => {
    rr.handle.stack &&
      rr.handle.stack.forEach((rrr) => {
        const path = prefix + rrr.route.path;
        const methods = Object.keys(rrr.route.methods).join(',');
        const comment = rrr.route.comment || '';

        pathTable.push({ path, methods, comment });
      });
  });

  console.table(pathTable);

  return router;
};
