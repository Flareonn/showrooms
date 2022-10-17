<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from "vue-router"
interface IProps {
  totalPages: number
}
defineProps<IProps>();
const emit = defineEmits<{
  (e: 'change', page: number): void
}>();
const currentPage = computed(() => {
  let currentPage = 1;
  const { page } = useRoute().query
  if(page && +page >= 0) {
    currentPage = +page;
  }
  emit('change', currentPage)
  return currentPage;
})
</script>

<template>
  <ul v-if="totalPages > 1" class="pagination">
    <li v-show="currentPage > 1">
      <router-link :to="`?page=${currentPage - 1}`">Предыдущая</router-link>
    </li>
    <template v-if="totalPages > 2">
      <li v-for="number in totalPages" :key="number">
        <router-link :to="`?page=${number}`">{{ number }}</router-link>
      </li>
    </template>
    <li v-show="currentPage < totalPages">
      <router-link :to="`?page=${currentPage + 1}`">Следующая</router-link>
    </li>
  </ul>
</template>