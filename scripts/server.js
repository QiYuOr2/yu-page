const Express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = Express();

// @yu-page/editor
app.use(
  createProxyMiddleware('/editor', {
    target: 'http://localhost:63642',
  })
);
app.use(
  createProxyMiddleware('/editor/img', {
    target: 'http://localhost:63642/img',
  })
);
app.use(
  createProxyMiddleware('/editor/css', {
    target: 'http://localhost:63642/css',
  })
);
app.use(
  createProxyMiddleware('/editor/js', {
    target: 'http://localhost:63642/js',
  })
);

// @yu-page/template
app.use(
  createProxyMiddleware('/template', {
    target: 'http://localhost:63641',
  })
);
app.use(
  createProxyMiddleware('/template/img', {
    target: 'http://localhost:63641/img',
  })
);
app.use(
  createProxyMiddleware('/template/css', {
    target: 'http://localhost:63641/css',
  })
);
app.use(
  createProxyMiddleware('/template/js', {
    target: 'http://localhost:63641/js',
  })
);

app.listen(3090, () => {
  console.log('http://localhost:3090');
});
