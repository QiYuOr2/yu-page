import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import path = require('path');
import { error } from './common/middleware/error';
import { CommonController, PageController, UserController } from './controller';
import { db } from './model';
import { jwt } from './common/middleware/jwt';

db.sync({ force: true });

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(jwt());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'prod') {
  app.use('/template', Express.static(path.join(__dirname, '../template')));
  app.use('/editor', Express.static(path.join(__dirname, '../editor')));
  app.get('/', (_req, res) => res.redirect('/editor'));
} else {
  const pkg = require('../package.json');
  app.get('/', (_req, res) => {
    res.send(`hello ${pkg.name}`);
  });
}

app.use(CommonController, UserController, PageController);

// 异常兜底处理
app.use(error);

export { app };
