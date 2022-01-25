import { createRouter } from '../common/createRouter';
import { MockService } from '../service/mock';

export const MockController = createRouter('/mock', (r) => {
  r.get('/', (req, res) => {
    res.send('hello mock');
  });
});
