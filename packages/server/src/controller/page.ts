import { createRouter } from '../common/createRouter';
import { PageService } from '../service/page';

export const MockController = createRouter('/page', (r) => {
  r.get('/', (req, res) => {
    res.send('hello page');
  });
});
