import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import path = require('path');
import { error } from './common/middleware/error';
import { CommonController, PageController, UserController } from './controller';
import { db } from './model';
import { jwt } from './common/middleware/jwt';

db.sync({ force: false });

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(jwt());

console.log(process.env.NODE_ENV);
app.use('/upload-image', Express.static(path.join(__dirname, '../upload')));
if (['prod', 'local'].includes(process.env.NODE_ENV)) {
  app.use('/template', Express.static(path.join(__dirname, '../template')));
  app.use('/editor', Express.static(path.join(__dirname, '../editor')));
  // app.use('/page', Express.static(path.join(__dirname, '../editor')));
  app.get('/', (_req, res) => res.redirect('/editor'));

  app.get('/mock/turntable/result', (req, res) => {
    res.json({
      status: { code: 0 },
      data: 4,
    });
  });

  app.get('/mock/turntable/data', (req, res) => {
    res.json({
      status: {
        code: 0,
      },
      data: [
        {
          label: '这是奖品标题',
          img: '/upload-image/1651749150537.jpg',
          text: '恭喜你，这是抽到该奖品的提示',
        },
        {
          label: 2,
          img: '',
          text: '恭喜你',
        },
        {
          label: 3,
          img: '',
          text: '恭喜你',
        },
        {
          label: 4,
          img: '',
          text: '恭喜你',
        },
        {
          label: 5,
          img: '',
          text: '恭喜你',
        },
        {
          label: 6,
          img: '',
          text: '恭喜你',
        },
        {
          label: 7,
          img: '',
          text: '恭喜你',
        },
        {
          label: 8,
          img: '',
          text: '恭喜你',
        },
      ],
    });
  });
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
