import { ErrorRequestHandler } from 'express';
import { Yu, YuStatus } from '../yu';

export const error: ErrorRequestHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  res.json(Yu.error(YuStatus.SystemError));
};
