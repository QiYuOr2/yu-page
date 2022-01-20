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

  return { to, back, backHome };
}
