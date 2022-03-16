import { ROUTER } from '../common/constants';
import { useRouter, LocationQueryRaw, RouteParamsRaw } from 'vue-router';

type RouterOptions = {
  query?: LocationQueryRaw;
  params?: RouteParamsRaw;
};

export function useNav() {
  const r = useRouter();

  const to = (name: keyof typeof ROUTER, options?: RouterOptions) => {
    if (options) {
      r.push({ ...options, name: ROUTER[name] });
      return;
    }
    r.push({ name: ROUTER[name] });
  };

  const back = () => {
    r.back();
  };

  const backHome = () => {
    to('HOME');
  };

  const getRouteName = () => {
    return r.currentRoute.value.name;
  };

  const getQuery = (key: string) => {
    return r.currentRoute.value.query[key] || null;
  };

  return { to, back, backHome, getRouteName, getQuery };
}
