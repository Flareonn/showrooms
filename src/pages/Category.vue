<script setup lang="ts">
import { reactive, ref, watchEffect, computed, inject } from "vue";

import { useStoreCategories } from "@/store/categories";
import { useRoute } from "vue-router";
import { AxiosStatic } from "axios";

import AccordionFilter from "@/components/controls/AccordionFilter.vue";
import InputSearch from "@/components/controls/InputSearch.vue";
import ProductCard from "@/components/product/ProductCard.vue";
import DropdownSort from "@/components/controls/DropdownSort.vue";

const route = useRoute();
const storeCategories = useStoreCategories();
const axios = inject("axios") as AxiosStatic;

const currentCategory = ref<CategoryDetails>({
  detail_img: "",
  grid_img: "",
  header_img: "",
  id: -1,
  name: "",
  parent: -1,
  recommend_img: "",
  title: "",
  description: "",
  category_children: [],
});
const products = ref<ResponseProducts>({
  links: {
    next: null,
    previous: null,
  },
  count: 0,
  count_pages: 0,
  results: [],
});
const controls = reactive({
  search: "",
});

const categories = computed(() => {
  const id = route.params.id.at(-1);
  if (id && storeCategories.map[+id]) {
    return storeCategories.map[+id].category_children;
  }
  return [];
});
watchEffect(async () => {
  currentCategory.value = (
    await axios.get(`/categories/${route.params.id.at(-1)}/`)
  ).data;
});
</script>

<template>
  <base-breadcrumbs />
  <main class="category-wrapper">
    <div class="container">
      <div class="grid">
        <div class="one">
          <div class="category-image">
            <img
              :src="currentCategory.header_img"
              :alt="currentCategory.title"
            />
          </div>
        </div>
        <div class="two">
          <div class="category-title">
            <h2>{{ currentCategory.name }}</h2>
          </div>
        </div>
        <div class="three">
          <div class="category-description">
            <p>{{ currentCategory.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div class="container">
    <div class="content">
      <div class="row">
        <div class="col-md-4 col-lg-3 d-flex flex-column">
          <input-search
            class="d-flex d-md-none mb-3"
            placeholder="Поиск"
            :initial-input="controls.search"
          />
          <accordion-filter id="accordion-filter-1" />
          <category-list
            :categories="categories"
            type="filter"
            class="list-unstyled d-none d-md-block"
          />
        </div>
        <div class="col-md-8 col-lg-9">
          <div class="row">
            <!-- Content Action Start //-->
            <dropdown-sort />
            <div
              class="d-none d-md-block mb-3 mb-md-0 col-12 col-md-7 col-lg-4 offset-md-1 offset-lg-2"
            >
              <input-search
                placeholder="Поиск"
                :initial-input="controls.search"
              />
            </div>
            <div
              class="d-flex justify-content-end mb-5 col-6 col-md-12 mt-0 mt-md-4"
            >
              <a href="#mapModal" data-toggle="modal">Показать на карте</a>
            </div>
            <!-- Content Action End //-->
          </div>
          <!-- Product List Start //-->
          <div class="product-list row">
            <div
              v-for="product in products.results"
              :key="product.id"
              class="col-6 col-lg-4"
            >
              <product-card v-bind="product" />
            </div>
          </div>
          <!-- Product List End //-->

          <!-- Pagination Start //-->
          <base-pagination :total-pages="products.count_pages" />
          <!-- Pagination End //-->
        </div>
      </div>
    </div>
    <!-- <related-content /> -->
  </div>
</template>
