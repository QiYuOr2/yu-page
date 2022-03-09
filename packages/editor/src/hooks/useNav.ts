import { ROUTER } from '../common/constants';
import { useRouter } from 'vue-router';

export function useNav() {
  const r = useRouter();

  const to = (name: keyof typeof ROUTER) => {
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
