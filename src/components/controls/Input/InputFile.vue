<script setup lang="ts" :inherit-attrs="false">
import { ref } from "vue";

interface IProps {
  id: string;
  placeholder?: string;
  modelValue?: FileList | null;
}
defineProps<IProps>();
const emit = defineEmits<{
  (e: "change", url: FileList | null): void;
}>();

const file = ref<HTMLInputElement | null>(null);
const trigger = () => {
  (file.value as HTMLInputElement).click();
};

defineExpose({ trigger });
</script>

<template>
  <div class="upload">
    <label :for="id">{{ placeholder }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      ref="file"
      type="file"
      name="file"
      @change="emit('change', ($event.target as HTMLInputElement).files)"
    />
  </div>
</template>
