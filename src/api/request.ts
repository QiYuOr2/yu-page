import axios from 'axios';

const baseURL = process.env.BASE_URL;
const axiosRequest = axios.create({
  baseURL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const mockRequest = (url: string, ...args: any[]) => Promise.resolve(require(`../mock${url}.json`));

export const request = (url: string, ...args: any[]) => {
  url = url.slice(0, 1) === '/' ? url : `/${url}`;
  if (process.env.NODE_ENV === 'mock') {
    return mockRequest(url, ...args);
  }
  return axiosRequest({ url, ...args });
};
