<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { mergeQuery } from "@/mixins/router";
interface IProps {
  totalPages: number;
}
defineProps<IProps>();
const emit = defineEmits<{
  (e: "change", page: number): void;
}>();

const route = useRoute();

const currentPage = computed(() => {
  let currentPage = 1;
  const { page } = route.query;
  if (page && +page >= 0) {
    currentPage = +page;
  }
  emit("change", currentPage);
  return currentPage;
});
const navigateTo = computed(() => {
  return {
    prev: mergeQuery({ page: `${currentPage.value - 1}` }),
    page: (number: number) => mergeQuery({ page: `${number}` }),
    next: mergeQuery({ page: `${currentPage.value + 1}` }),
  };
});
</script>

<template>
  <ul v-if="totalPages > 1" class="pagination">
    <li v-show="currentPage > 1">
      <router-link :to="navigateTo.prev">Предыдущая</router-link>
    </li>
    <template v-if="totalPages > 2">
      <li v-for="number in totalPages" :key="number">
        <router-link :to="navigateTo.page(number)">{{ number }}</router-link>
      </li>
    </template>
    <li v-show="currentPage < totalPages">
      <router-link :to="navigateTo.next">Следующая</router-link>
    </li>
  </ul>
</template>
