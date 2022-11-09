<script setup lang="ts">
import { defineAsyncComponent } from "vue";
interface IProps {
  component: "search" | "password" | "file";
  modelModifiers?: Record<string, boolean>;
}

const props = withDefaults(defineProps<IProps>(), {
  modelModifiers: () => ({}),
});

const components = {
  search: defineAsyncComponent(
    () => import("@/components/controls/Input/InputSearch.vue")
  ),
  file: defineAsyncComponent(
    () => import("@/components/controls/Input/InputFile.vue")
  ),
  password: defineAsyncComponent(
    () => import("@/components/controls/Input/InputPassword.vue")
  ),
};

const emit = defineEmits<{
  (e: "update:modelValue", input: string): void;
}>();

const onInput = (text: string) =>
  !props.modelModifiers.lazy && emit("update:modelValue", text);
const onChange = (text: string) => emit("update:modelValue", text);
</script>

<template>
  <component
    v-bind="$attrs"
    :is="components[component]"
    @input="onInput"
    @change="onChange"
  ></component>
</template>
