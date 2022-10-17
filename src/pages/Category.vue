<script setup lang="ts">
import { ref, watchEffect, computed, inject } from "vue";

import { useStoreCategories } from "@/store/categories";
import { useRoute, useRouter } from "vue-router";
import { AxiosStatic } from "axios";

import AccordionFilter from "@/components/controls/AccordionFilter.vue";
import InputSearch from "@/components/controls/InputSearch.vue";
import DropdownSort from "@/components/controls/DropdownSort.vue";
import ProductsList from "@/components/product/ProductsList.vue";
import { mergeQuery } from "@/mixins/router";

const route = useRoute();
const router = useRouter();
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
const searchControl = ref(route.query.search?.toString() || "");

const categoryId = computed(() => {
  const id = route.params.id.at(-1);
  if (id) {
    return +id;
  }
  useRouter().back();
  return 0;
});
const categories = computed(
  () => storeCategories.map[categoryId.value].category_children
);
watchEffect(async () => {
  currentCategory.value = (
    await axios.get(`/categories/${categoryId.value}/`)
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
            :initial-input="searchControl"
            @change="(search) => router.push(mergeQuery({ search }))"
          />
          <accordion-filter
            id="accordion-filter-1"
            :is-open="!categories.length"
          />
          <category-list
            :categories="categories"
            type="link"
            class="list-unstyled d-none d-md-block"
          />
        </div>
        <div class="col-md-8 col-lg-9">
          <div class="row">
            <!-- Content Action Start //-->
            <dropdown-sort class="mb-5 mb-md-0 col-6 col-md-4 col-lg-6" />
            <div
              class="d-none d-md-block mb-3 mb-md-0 col-12 col-md-7 col-lg-4 offset-md-1 offset-lg-2"
            >
              <input-search
                placeholder="Поиск"
                :initial-input="searchControl"
                @change="(search) => router.push(mergeQuery({ search }))"
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
          <products-list :initial-query="{ categories__id: categoryId }" />
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
