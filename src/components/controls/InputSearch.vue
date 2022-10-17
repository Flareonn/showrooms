<script setup lang="ts" :inherit-attrs="false">
import { ref, watch, onMounted, onUnmounted } from "vue";
interface IProps {
  initialInput: string;
}
const props = withDefaults(defineProps<IProps>(), {
  initialInput: "",
});
const emit = defineEmits<{
  (e: "change", input: string): void;
  (e: "input", input: string): void;
}>();

const onTipSelect = (tip: string) => {
  input.value = tip;
  emit("change", tip);
};
const onInput = (e: Event) =>
  (input.value = (e.target as HTMLInputElement).value);
const onChange = () => emit("change", input.value);

let input = ref(props.initialInput);
let isOpen = ref(false);
// @todo
const searchBox = ref(null);
const search = ref(null);
const tips = ref([
  "Название подборки",
  "Название подборки1",
  "Название подборки2",
  "Название подборки3",
  "Название подборки4",
]);

watch(input, (val) => {
  emit("input", val);
  isOpen.value = false;
});
onMounted(() => {
  window.onclick = (e) => {
    if (
      searchBox.value &&
      !(searchBox.value as HTMLElement).contains(e.target as HTMLElement)
    ) {
      isOpen.value = false;
    }
  };
});
onUnmounted(() => (window.onclick = null));
</script>

<template>
  <div ref="searchBox" class="search-box">
    <i class="icon-search"></i>
    <input
      v-bind="$attrs"
      ref="search"
      type="search"
      :value="input"
      @focus="isOpen = true"
      @input="onInput"
      @keydown.enter="onChange"
      @blur="onChange"
    />
    <ul v-show="isOpen" class="search-autocomplite">
      <li>Популярное</li>
      <li
        v-for="(tip, idx) in tips"
        :key="idx"
        @click.prevent.capture="() => onTipSelect(tip)"
      >
        <span>{{ tip }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
input::-webkit-search-cancel-button {
  display: none;
}
</style>
