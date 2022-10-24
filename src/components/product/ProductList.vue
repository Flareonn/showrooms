<script setup lang="ts">
import { reactive } from "vue";

interface IProps {
  fetch: () => Promise<Paginate<any>>;
}
const props = defineProps<IProps>();
const products = reactive(await props.fetch());
</script>

<template>
  <div class="showroom-product-list row">
    <div
      v-for="(item, idx) in products.results"
      :key="idx"
      class="col-6 col-md-4 col-lg-3"
    >
      <slot :item="item"></slot>
    </div>
  </div>
  <base-pagination :total-pages="products.count_pages" />
</template>
