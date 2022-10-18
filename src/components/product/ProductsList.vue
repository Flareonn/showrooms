<script setup lang="ts">
import ProductCard from "@/components/product/ProductCard.vue";
import { useStoreProducts } from "@/store/products";
import { ref, watchEffect } from "vue";
import { LocationQuery, useRoute } from "vue-router";

interface IProps {
  query?: LocationQuery;
}
const props = defineProps<IProps>();

const { fetchProducts } = useStoreProducts();
const route = useRoute();

let products = ref<IResponse<Showroom>>({
  links: {
    next: null,
    previous: null,
  },
  count: 0,
  count_pages: 0,
  results: [],
});

watch(
  () => route.query,
  async (val: any) => {
    products.value = await fetchProducts(
      Object.assign({}, val, props.initialQuery)
    );
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
