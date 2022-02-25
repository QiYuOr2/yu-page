import { createRouter } from '../common/createRouter';

export const MockController = createRouter('/page', (r) => {
  r.get('/', (req, res) => {
    res.send('hello page');
  });
});
