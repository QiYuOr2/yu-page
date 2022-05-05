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

app.listen(3090, () => {
  console.log('http://localhost:3090');
});
