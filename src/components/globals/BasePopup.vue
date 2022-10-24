<script setup lang="ts">
import { ref, watch, useAttrs, onUnmounted } from "vue";
import watchAndClose from "@/utils/popup";
const attrs = useAttrs();

const isOpen = ref(false);
const popup = ref<HTMLElement | null>(null);

const close = () => {
  isOpen.value = false;
  document.body.classList.remove("modal-open");
};
const open = () => {
  isOpen.value = true;
  document.body.classList.add("modal-open");
};
defineExpose({ close, open });

watch(
  popup,
  (value) => {
    if (value) {
      watchAndClose(isOpen, popup.value as HTMLElement, close);
    }
  },
  { immediate: true }
);

onUnmounted(close);
</script>
<template>
  <Teleport to="body" v-if="isOpen">
    <div ref="popup" class="custom-modal" v-bind="attrs">
      <div class="modal-close" @click="close">&#10005;</div>
      <slot></slot>
    </div>
  </Teleport>
</template>
