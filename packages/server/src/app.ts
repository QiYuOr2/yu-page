import * as Express from 'express';
import { error } from './common/middleware/error';
import { CommonController, PageController, UserController } from './controller';
import { db } from './model';

const pkg = require('../package.json');

db.sync({ force: true });

const app = Express();

app.get('/', (req, res) => {
  res.send(`hello ${pkg.name}`);
});
app.use(CommonController, UserController, PageController);

// 异常兜底处理
app.use(error);

export { app };
