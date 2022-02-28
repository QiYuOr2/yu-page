export const YuStatus = {
  Success: 0,
  InvalidParams: 1,
  NotExist: 2,

  SystemError: 10001,
  AuthError: 10002,
  Timeout: 10003,
};

export const YuMessage = {
  [YuStatus.Success]: '成功',
  [YuStatus.Timeout]: '请求超时',
  [YuStatus.InvalidParams]: '参数错误',
  [YuStatus.AuthError]: '鉴权失败',
  [YuStatus.SystemError]: '系统错误',
  [YuStatus.NotExist]: '数据不存在',
};

export class Yu {
  static response<T>(code: number, data?: T, message?: string) {
    return {
      status: {
        code,
        message: !message ? YuMessage[code] || '' : message,
      },
      data,
    };
  }

  static success<T>(data: T) {
    return this.response(YuStatus.Success, data);
  }

  static error(code: number, message?: string) {
    return this.response(code, null, message);
  }
}
