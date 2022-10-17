<script setup lang="ts">
import ProductCard from "@/components/product/ProductCard.vue";
import { useStoreProducts } from "@/store/products";
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routeNames } from "@/plugins/router";

const { fetchProducts } = useStoreProducts();
const route = useRoute();

let products = ref<ResponseProducts>({
  links: {
    next: null,
    previous: null,
  },
  count: 0,
  count_pages: 0,
  results: [],
});
const categoryId = computed(() => {
  const id = route.params.id.at(-1);
  if (id) {
    return +id;
  }
  useRouter().back();
  return 0;
});

watch(
  () => route.query,
  async (val: any) => {
    if (route.name === routeNames.category) {
      val.categories__id = categoryId.value;
    }
    products.value = await fetchProducts(val);
  },
  { immediate: true }
);
</script>

<template>
  <div class="product-list row">
    <div
      v-for="product in products.results"
      :key="product.id"
      class="col-6 col-lg-4"
    >
      <product-card v-bind="product" />
    </div>
  </div>
  <base-pagination :total-pages="products.count_pages" />
</template>
