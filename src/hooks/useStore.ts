import { ref } from 'vue';

function createContext() {
  const activeId = ref('');

  return () => ({ activeId });
}

export default createContext();
