import axios, { Method, AxiosRequestConfig } from 'axios';
import { config } from '@/common/config';

export type YuResponse<T> = {
  status: {
    code: number;
    message: string;
  };
  result: T;
};

export type RequestOptions = {
  url: string;
  method?: Method;
  data?: any;
};

const axiosRequest = axios.create({
  baseURL: config.BASE_URL,
  timeout: 100000,
});

const buildOptions = (config: AxiosRequestConfig) => {
  if (config.method && config.method.toUpperCase() === 'GET') {
    return { url: config.url, method: config.method, params: { ...config.data } };
  }
  return { url: config.url, method: config.method, data: config.data };
};

type YuRequest = <T = null>(options: RequestOptions) => Promise<YuResponse<T>>;

export const yuRequest: YuRequest = async (options) => {
  const axiosResponse = await axiosRequest(buildOptions(options));

  const { status, result } = axiosResponse.data;

  return { status, result };
};
