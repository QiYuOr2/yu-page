import { fork } from '../common/utils';

export function useFrame() {
  const postMessage = (msg) => {
    // 通过JSON.parse和JSON.stringify来去除proxy
    const parsedMessage = fork(msg);
    window.parent.postMessage(parsedMessage, '*');
  };

  return { postMessage };
}
