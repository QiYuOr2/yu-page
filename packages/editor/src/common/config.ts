const _config: Record<string, Record<string, string>> = {
  development: {
    BASE_URL: 'http://localhost:3090/api',
  },
  production: {
    BASE_URL: 'http://localhost:3090/api',
  },
  prod: {
    BASE_URL: 'http://localhost:3090/api',
  },
};

export const config = _config[process.env.NODE_ENV!];
