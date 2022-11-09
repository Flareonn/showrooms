<script setup lang="ts" :inherit-attrs="false">
import { ref, onMounted, onUnmounted } from "vue";
defineProps<{
  modelValue?: string;
}>();
const emit = defineEmits<{
  (e: "input", text: string): void;
  (e: "change", text: string): void;
}>();

const isOpen = ref(false);
const searchBox = ref<HTMLDivElement | null>(null);
const tips = ref([
  "Название подборки",
  "Название подборки1",
  "Название подборки2",
  "Название подборки3",
  "Название подборки4",
]);

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
      ref="search"
      type="search"
      v-bind="$attrs"
      :value="modelValue"
      @focus="isOpen = true"
      @input="emit('input', ($event.target as HTMLInputElement).value)"
      @change="emit('change', ($event.target as HTMLInputElement).value)"
    />
    <ul v-show="isOpen" class="search-autocomplite">
      <li>Популярное</li>
      <li
        v-for="(tip, idx) in tips"
        :key="idx"
        @click.prevent.capture="emit('input', tip)"
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
