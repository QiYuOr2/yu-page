import { COOKIE, ROUTER } from '../common/constants';
import { useRouter, LocationQueryRaw, RouteParamsRaw } from 'vue-router';
import { cookie } from '@/common/utils';

type RouterOptions = {
  query?: LocationQueryRaw;
  params?: RouteParamsRaw;
};

export function useNav() {
  const r = useRouter();

  const to = (name: string, options?: RouterOptions) => {
    if (Object.keys(ROUTER).includes(name)) {
      if (options) {
        r.push({ ...options, name: ROUTER[name as keyof typeof ROUTER] });
        return;
      }
      r.push({ name: ROUTER[name as keyof typeof ROUTER] });
    }
  };

  const back = () => {
    r.back();
  };

  const backHome = () => {
    to(ROUTER.HOME);
  };

  const getRouteName = () => {
    return r.currentRoute.value.name;
  };

  const getQuery = (key: string) => {
    return r.currentRoute.value.query[key] || null;
  };

  r.beforeEach((toRoute, _from, next) => {
    console.log('beforeEach', toRoute);
    const token = cookie.get(COOKIE.TOKEN);

    console.log(!token && toRoute.name !== ROUTER.P && toRoute.name !== ROUTER.LOGIN);

    if (!token && toRoute.name !== ROUTER.P && toRoute.name !== ROUTER.LOGIN) {
      next({ name: ROUTER.LOGIN });
    }
    next();
  });

  return { to, back, backHome, getRouteName, getQuery };
}
