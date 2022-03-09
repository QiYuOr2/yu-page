import * as expressJwt from 'express-jwt';

export const jwt = () =>
  expressJwt({
    secret: 'qiyuor2',
    algorithms: ['HS256'],
    getToken: (req) => (req.cookies.token ? req.cookies.token.split(' ')[0] : null),
  }).unless({
    path: ['/', '/template', '/editor', '/api/user/login', '/api/user/register'],
  });
