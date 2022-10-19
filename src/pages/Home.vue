<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStoreCategories } from "@/store/categories";
import { slides } from "@/constants/hardcode";
import { mergeQuery } from "@/utils/router";

import { Navigation } from "swiper";

import type { BasePopup } from "@/components/globals";

import InputSearch from "@/components/controls/InputSearch.vue";
import AccordionFilter from "@/components/controls/AccordionFilter.vue";
import DropdownSort from "@/components/controls/DropdownSort.vue";
import ProductsList from "@/components/product/ProductsList.vue";
import RelatedSlider from "@/components/sliders/Related.vue";

const route = useRoute();
const router = useRouter();
const { categories } = useStoreCategories();

const searchControl = ref(route.query.search?.toString() || "");
const popup = ref<typeof BasePopup | null>(null);
const slider = reactive<Swiper>({
  settings: {
    slideClass: "slider-item",
    modules: [Navigation],
    navigation: {
      nextEl: ".hero-slider .slick-next",
      prevEl: ".hero-slider .slick-prev",
    },
    autoHeight: true,
    loop: true,
    loopedSlides: slides.length,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      600: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  },
  slides,
});
</script>

<template>
  <div>
    <div class="hero">
      <div class="container position-relative">
        <div class="hero-content">
          <h1>Women's Summer Collections</h1>
          <p>
            Compellingly fashion cutting-edge portals before exceptional
            meta-services. Completely maintain stand-alone.
          </p>
        </div>
      </div>
      <base-slider class="hero-slider" v-bind="slider">
        <template #afterWrapper>
          <button
            class="slick-next slick-arrow"
            aria-label="Слайдер вперед"
            type="button"
          >
            <i class="icon-arrow-slider"></i>
          </button>
          <button
            class="slick-prev slick-arrow"
            aria-label="Слайдер назад"
            type="button"
          >
            <i class="icon-arrow-slider"></i></button
        ></template>
      </base-slider>
    </div>

    <main class="container">
      <div class="content">
        <div class="heading-wrapper">
          <h3>Explore our Products</h3>
          <input-search
            placeholder="Поиск"
            :initial-input="searchControl"
            @change="(search) => router.push(mergeQuery({ search }))"
          />
        </div>
        <div class="row">
          <div class="col-md-4 col-lg-3">
            <accordion-filter
              id="accordion-filter-1"
              @submit="(filters) => router.push(mergeQuery(filters))"
              @clear="router.push({ query: {} })"
            />
            <category-list
              :categories="categories"
              type="link"
              class="list-unstyled d-none d-md-block"
            />
          </div>
          <div class="col-md-8 col-lg-9">
            <div
              class="content-action d-flex align-items-center justify-content-between"
            >
              <dropdown-sort />
              <a href="#mapModal" @click.prevent="popup?.open">
                Показать на карте
              </a>
            </div>

            <products-list />
          </div>
        </div>
      </div>
      <RelatedSlider />
    </main>

    <base-popup ref="popup" class="map-modal">
      <div class="map-modal-content">
        <div class="row">
          <div class="col-md-4 col-lg-3">
            <accordion-filter
              id="accordion-filter-2"
              class="py-3 py-md-4 ps-4 pe-4 pe-md-0"
              is-open
            />
          </div>
          <div class="col-md-8 col-lg-9">
            <div style="position: relative; overflow: hidden">
              <yandex-map
                :coords="[0, 0]"
                :controls="['smallMapDefaultSet']"
                style="width: 100%; height: 640px"
                zoom="15"
                :show-all-markers="true"
              >
              </yandex-map>
            </div>
          </div>
        </div>
      </div>
    </base-popup>
  </div>
</template>
