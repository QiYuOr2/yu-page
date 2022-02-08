// import { isProxy, toRaw } from 'vue';

export function useFrame() {
  const postMessage = (msg) => {
    // window.parent.postMessage(isProxy(msg) ? toRaw(msg) : msg, '*');
    window.parent.postMessage(msg, '*');
  };

  return { postMessage };
}
