import * as Express from 'express';
import { MockController } from './controller/mock';
import { db } from './model';

db.sync();

const app = Express();

app.use(MockController);

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
