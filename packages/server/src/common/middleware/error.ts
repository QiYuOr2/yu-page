import { ErrorRequestHandler } from 'express';
import { Yu, YuMessage, YuStatus } from '../yu';

export const error: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.json(Yu.error(YuStatus.AuthError));
    return;
  }

  res.json(Yu.error(YuStatus.SystemError, JSON.stringify(err)));
};
