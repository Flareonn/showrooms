<script setup lang="ts">
import ProductCardMini from "@/components/product/ProductCardMini.vue";
import { useStoreProducts } from "@/store/products";
import { reactive } from "vue";

interface IProps {
  id: number;
}
const props = defineProps<IProps>();
const { fetchBestItems } = useStoreProducts();

const products = reactive<IResponse<Showroom>>(await fetchBestItems(props.id));
</script>

<template>
  <div class="showroom-product-list row">
    <div
      v-for="(item, idx) in products.results"
      :key="idx"
      class="col-6 col-md-4 col-lg-3"
    >
      <product-card-mini v-bind="item" />
    </div>
  </div>
  <base-pagination :total-pages="products.count_pages" />
</template>
