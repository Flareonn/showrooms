<script setup lang="ts" async>
import "swiper/css";
import type { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

interface IProps {
  settings: SwiperOptions;
  slides: Slide[];
}
const slider = defineProps<IProps>();
</script>

<template>
  <div :class="['base-slider']">
    <!-- @ts-ignore -->
    <swiper v-bind="slider.settings">
      <swiper-slide
        v-for="(slide, idx) in slider.slides"
        :key="idx"
        class="slider-item"
      >
        <img :src="slide.grid_img" alt="" />
        <div class="slider-title">{{ slide.title }}</div>
        <a href="#" class="stretched-link"></a>
      </swiper-slide>
    </swiper>
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
      <i class="icon-arrow-slider"></i>
    </button>
  </div>
</template>
