<script setup lang="ts" :inherit-attrs="false">
import { ref } from "vue";

interface IProps {
  id: string;
  placeholder: string;
}
withDefaults(defineProps<IProps>(), {
  placeholder: "Загрузить",
});
const emit = defineEmits<{
  (e: "change", url: string): void;
}>();

const file = ref<HTMLInputElement | null>(null);

const onUpload = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    emit("change", URL.createObjectURL(files[0]));
  }
};
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
      @change="onUpload"
    />
  </div>
</template>
