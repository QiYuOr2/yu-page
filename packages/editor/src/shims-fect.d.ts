import { Toast } from '@fect-ui/vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * Fect Toast
     */
    $toast: Toast;
  }
}
