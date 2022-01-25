import * as Express from 'express';
import { MockController } from './controller/mock';

const app = Express();

app.use(MockController);

app.get('/', (req, res) => {
  res.send('12');
});

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
