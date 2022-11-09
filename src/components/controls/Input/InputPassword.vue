<script setup lang="ts" :inherit-attrs="false">
import { ref, computed } from "vue";
defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "input", text: string): void;
  (e: "change", text: string): void;
}>();

const isVisiblePassword = ref(false);
const inputType = computed(() =>
  isVisiblePassword.value ? "text" : "password"
);
</script>

<template>
  <div class="input-password">
    <input
      :type="inputType"
      name="password"
      v-bind="$attrs"
      :value="modelValue"
      @input="emit('input', ($event.target as HTMLInputElement).value)"
      @change="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <button
      class="show-password"
      aria-label="Показать пароль"
      @click.prevent="isVisiblePassword = !isVisiblePassword"
    >
      <i class="icon-eye"></i>
    </button>
  </div>
</template>

<style>
input::-webkit-passman-key {
  display: none;
}
</style>
