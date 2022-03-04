import * as Express from 'express';
import * as expressJwt from 'express-jwt';
import path = require('path');
import { error } from './common/middleware/error';
import { CommonController, PageController, UserController } from './controller';
import { db } from './model';

db.sync({ force: true });

const app = Express();

app.use(
  expressJwt({ secret: 'qiyuor2', algorithms: ['HS256'] }).unless({
    path: ['/template', '/editor', '/api/user/login', '/api/user/register'],
  })
);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'prod') {
  app.use('/template', Express.static(path.join(__dirname, '../template')));
  app.use('/editor', Express.static(path.join(__dirname, '../editor')));
} else {
  const pkg = require('../package.json');
  app.get('/', (req, res) => {
    res.send(`hello ${pkg.name}`);
  });
}

app.use(CommonController, UserController, PageController);

// 异常兜底处理
app.use(error);

export { app };
