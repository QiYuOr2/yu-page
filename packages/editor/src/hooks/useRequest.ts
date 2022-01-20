import axios, { Method } from 'axios';
import { ref, watchEffect } from 'vue';
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

const request = axios.create({
  baseURL: config.BASE_URL,
  timeout: 100000,
});

export function useRequest<T>(options: RequestOptions) {
  const { url, method, data } = options;

  const loading = ref(true);
  const responseData = ref<T>();
  const error = ref();

  const buildOptions = () => {
    if (method && method.toUpperCase() === 'GET') {
      return { url, method, params: { data } };
    }
    return { url, method, data };
  };

  const doRequest = async () => {
    const axiosResponse = await request(buildOptions());

    const { status, result }: YuResponse<T> = axiosResponse.data;

    if (status.code === 0) {
      responseData.value = result;
    } else {
      error.value = status.message;
    }
  };

  watchEffect(async () => {
    loading.value = false;
    await doRequest();
    loading.value = true;
  });

  return { loading, error, data: responseData };
}
