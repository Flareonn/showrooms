<script setup lang="ts" :inherit-attrs="false">
import { ref, onMounted } from 'vue';
import watchAndClose from "@/mixins/popup"
interface IProps {
  placeholder?: string | null;
  classes?: {
    button: string;
    menu: string
  }
}

withDefaults(defineProps<IProps>(), {
  placeholder: null,
  classes: () => ({
    button: "",
    menu: "",
  })
})

const dropdown = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const close = () => isOpen.value = false
const open = () => isOpen.value = true
const toggle = () => isOpen.value = !isOpen.value
defineExpose({ close, open, toggle });

onMounted(() => {
  watchAndClose(isOpen, (dropdown.value as HTMLElement), close)
})
</script>

<template>
  <div ref="dropdown" class="btn-group">
    <button class="btn-primary-link dropdown-toggle" type="button" :class="classes.button" @click="toggle">
      <slot name="placeholder">
        {{placeholder}}
        <i v-if="classes.button.includes('btn-order')" class="icon-sort"></i>
      </slot>
    </button>
    <ul class="dropdown-menu" :class="[{ show: isOpen }, classes.menu]">
      <slot name="menu"></slot>
    </ul>
  </div>
</template>