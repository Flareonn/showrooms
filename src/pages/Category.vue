<script setup lang="ts">
import { ref, watch, watchEffect, computed } from "vue";

import { useStoreCategories } from "@/store/categories";
import { useRoute, useRouter } from "vue-router";

import AccordionFilter from "@/components/controls/AccordionFilter.vue";
import DropdownSort from "@/components/controls/DropdownSort.vue";
import ProductsList from "@/components/product/ProductsList.vue";
import { mergeQuery } from "@/utils/router";
import { AxiosKey, injectStrict } from "@/utils/keys";

interface IProps {
  id: string;
}
const props = defineProps<IProps>();

const route = useRoute();
const router = useRouter();
const storeCategories = useStoreCategories();
const axios = injectStrict(AxiosKey);

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
const products = ref<Paginate<Showroom>>({
  links: {
    next: null,
    previous: null,
  },
  count: 0,
  count_pages: 0,
  results: [],
});
const searchControl = ref(route.query.search?.toString() || "");

const categories = computed(
  () => storeCategories.map[+props.id].category_children
);
watchEffect(async () => {
  currentCategory.value = (await axios.get(`/categories/${props.id}/`)).data;
});
watch(searchControl, (search) => router.push(mergeQuery({ search })));
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
          <base-input
            component="search"
            class="d-flex d-md-none mb-3"
            placeholder="Поиск"
            v-model.lazy="searchControl"
          />
          <accordion-filter
            id="accordion-filter-1"
            @submit="(filters) => router.push(mergeQuery(filters))"
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
            <dropdown-sort class="mb-5 mb-md-0 col-6 col-md-4 col-lg-6" />
            <div
              class="d-none d-md-block mb-3 mb-md-0 col-12 col-md-7 col-lg-4 offset-md-1 offset-lg-2"
            >
              <base-input
                component="search"
                placeholder="Поиск"
                v-model.lazy="searchControl"
              />
            </div>
            <div
              class="d-flex justify-content-end mb-5 col-6 col-md-12 mt-0 mt-md-4"
            >
              <a href="#mapModal" data-toggle="modal">Показать на карте</a>
            </div>
          </div>

          <products-list :query="{ categories__id: props.id }" />

          <base-pagination :total-pages="products.count_pages" />
        </div>
      </div>
    </div>
    <!-- <related-content /> -->
  </div>
</template>
