import * as Express from 'express';
import { error } from './common/middleware/error';
import { CommonController, PageController, UserController } from './controller';
import { db } from './model';

db.sync({ force: true });

const app = Express();

app.use(CommonController, UserController, PageController);
// 错误兜底处理
app.use(error);

app.listen(3000, () => {
  console.log('running at http://localhost:3000');
});
