<script setup lang="ts">
import { Navigation, SwiperOptions } from "swiper";
import { reactive } from "vue";
import { slides as hardcodeSlides } from "@/constants/hardcode";

interface IProps {
  slides?: Slide[];
}
withDefaults(defineProps<IProps>(), {
  slides: () => hardcodeSlides,
});
const settings = reactive<SwiperOptions>({
  slideClass: "slider-item",
  modules: [Navigation],
  navigation: {
    nextEl: ".related-content .slick-next",
    prevEl: ".related-content .slick-prev",
  },
  autoHeight: true,
  breakpoints: {
    1024: {
      slidesPerView: 6,
    },
    600: {
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
    },
  },
  spaceBetween: 4,
});
</script>

<template>
  <base-slider class="related-content" :settings="settings" :slides="slides">
    <template #before>
      <h3 class="mb4">Related Products</h3>
    </template>
    <template #slide="{ slide, image }">
      <div class="related-item">
        <div class="related-image">
          <img :src="image(slide)" :alt="slide.title" />
        </div>
        <div class="related-title">{{ slide.name }}</div>
        <a :href="slide.link" target="_blank" class="stretched-link"></a>
      </div>
    </template>
    <template #afterWrapper>
      <button
        class="slick-next slick-arrow"
        aria-label="Слайдер вперед"
        type="button"
      >
        <i class="icon-arrow-slider_min"></i>
      </button>
      <button
        class="slick-prev slick-arrow"
        aria-label="Слайдер назад"
        type="button"
      >
        <i class="icon-arrow-slider_min"></i>
      </button>
    </template>
  </base-slider>
</template>
