export function useFrame() {
  const postMessage = (msg) => {
    window.parent.postMessage(msg, '*');
  };

  return { postMessage };
}
