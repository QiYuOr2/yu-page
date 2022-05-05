const Express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = Express();

const createVueProxy = (target, host) => {
  app.use(
    createProxyMiddleware(`/${target}`, { target: host }),
    createProxyMiddleware(`/${target}/img`, { target: `${host}/img` }),
    createProxyMiddleware(`/${target}/css`, { target: `${host}/css` }),
    createProxyMiddleware(`/${target}/js`, { target: `${host}/js` })
  );
};

app.get('/', (_req, res) => {
  res.redirect('/editor');
});

// @yu-page/template
const TEMPLATE_HOST = 'http://localhost:63641';
createVueProxy('template', TEMPLATE_HOST);

// @yu-page/editor
const EDITOR_HOST = 'http://localhost:63642';
createVueProxy('editor', EDITOR_HOST);

// @yu-page/server
const SERVER_HOST = 'http://localhost:63643';
app.use(
  createProxyMiddleware('/api', {
    target: SERVER_HOST,
    changeOrigin: true,
  })
);
app.use(
  createProxyMiddleware('/upload-image', {
    target: SERVER_HOST,
    changeOrigin: true,
  })
);

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

app.listen(3090, () => {
  console.log('http://localhost:3090');
});
