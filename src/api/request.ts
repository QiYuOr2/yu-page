import { YuResponse } from '@/types';
import axios from 'axios';

const baseURL = process.env.BASE_URL;
const _axiosRequest = axios.create({
  baseURL,
});

_axiosRequest.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

_axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const axiosRequest = async <T>(url: string, ...args: any[]): Promise<YuResponse<T>> => {
  const axiosResponse = await _axiosRequest({ url, ...args });
  return axiosResponse.data;
};

const mockRequest = <T>(url: string, ...args: any[]): Promise<YuResponse<T>> => Promise.resolve(require(`../mock${url}.json`));

export const request = <T>(url: string, ...args: any[]): Promise<YuResponse<T>> => {
  url = url.slice(0, 1) === '/' ? url : `/${url}`;
  if (process.env.NODE_ENV === 'mock') {
    return mockRequest(url, ...args);
  }
  return axiosRequest(url, ...args);
};
