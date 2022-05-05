import { COOKIE, ROUTER } from '../common/constants';
import { useRouter, LocationQueryRaw, RouteParamsRaw } from 'vue-router';
import { cookie } from '@/common/utils';
import { useEditStore } from '@/store';

type RouterOptions = {
  query?: LocationQueryRaw;
  params?: RouteParamsRaw;
};

export function useNav() {
  const r = useRouter();
  const store = useEditStore();

  const to = (name: string, options?: RouterOptions) => {
    if (Object.values(ROUTER).includes(name)) {
      if (options) {
        r.push({ ...options, name });
        return;
      }
      r.push({ name });
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

  r.beforeEach((toRoute, fromRoute, next) => {
    // console.log('beforeEach', toRoute, fromRoute);
    const token = cookie.get(COOKIE.TOKEN);

    // console.log(
    //   !token && toRoute.name !== ROUTER.P && toRoute.name !== ROUTER.LOGIN
    // );

    store.setIsFromPreview(fromRoute.name === ROUTER.PREVIEW);

    if (!token && toRoute.name !== ROUTER.P && toRoute.name !== ROUTER.LOGIN) {
      next({ name: ROUTER.LOGIN });
    }
    next();
  });

  return {
    to,
    back,
    backHome,
    getRouteName,
    getQuery,
    isFromPreview: store.isFromPreview,
  };
}
