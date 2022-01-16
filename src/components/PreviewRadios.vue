<template>
  <fe-radioGroup>
    <div class="preview-radio" v-for="(style, i) in presetStyles" :key="i">
      <fe-img
        v-if="style.previewStyles.url"
        :src="style.previewStyles.url[0]"
      />
      <div class="preview-radio__content" v-else :style="genStyle(style.previewStyles)">
        {{ style.previewStyles.inner?.[0] || '' }}
      </div>
      <fe-radio :value="style.name">{{ style.name }}</fe-radio>
    </div>
  </fe-radioGroup>
</template>

<script lang="ts">
import { Image } from '@fect-ui/vue';
import { PresetType } from '@/types/dto';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: { 'fe-img': Image },
  props: {
    presetStyles: { type: [] as PropType<PresetType[]> },
  },
  setup(props) {
    const genStyle = (styles: Record<string, string[]>) => {
      return Object.keys(styles)
        .map((styleName) => {
          return `${styleName}:${styles[styleName].join('')};`;
        })
        .join('');
    };

    return {
      genStyle
    }
  },
});
</script>

<style lang="less" scoped>
.preview-radio {
  display: flex;
  flex-direction: column;
}
</style>
