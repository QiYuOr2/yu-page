const _config: Record<string, Record<string, string>> = {
  development: {
    BASE_URL: 'http://localhost:3090/api',
  },
};

export const config = _config[process.env.NODE_ENV!];
