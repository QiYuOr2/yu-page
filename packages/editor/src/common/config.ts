const _config: Record<string, Record<string, string>> = {
  development: {
    BASE_URL: 'http://localhost:3090/api',
    IFRAME_HOST: 'http://localhost',
  },
  // production: {
  //   BASE_URL: 'http://101.43.4.73:3090/api',
  //   IFRAME_HOST: 'http://101.43.4.73',
  // },
  production: {
    BASE_URL: 'http://localhost:3090/api',
    IFRAME_HOST: 'http://localhost',
  },
};

console.log(process.env.NODE_ENV!)

export const config = _config[process.env.NODE_ENV!];
