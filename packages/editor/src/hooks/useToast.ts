import { getCurrentInstance } from 'vue';

export function useToast() {
  const { proxy } = getCurrentInstance()!;

  const normal = (text: string, closeAble = true) =>
    proxy?.$toast({ text, closeAble });

  const error = (text: string, closeAble = true) =>
    proxy?.$toast({ type: 'error', text, closeAble });

  return { normal, error };
}
