<script setup lang="ts">
import { useStoreCategories } from "@/store/categories";
import { computed } from "vue";

interface IProps {
  categoriesIds: number[];
}

const props = defineProps<IProps>();

const storeCategories = useStoreCategories();

const categories = computed(() =>
  props.categoriesIds.map((id) => storeCategories.map[id])
);
</script>

<template>
  <div class="showroom-categories">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link :to="`/category${category.path}`">{{
          category.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
