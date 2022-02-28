import { createRouter } from '../common/createRouter';

export const CommonController = createRouter('/common', (r) => {
  r.post('/upload', (req, res) => {
    res.send('hello common');
  });
});
