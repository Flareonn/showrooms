<script setup lang="ts">
import "swiper/css";
import type { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed } from "vue";

interface IProps {
  settings: SwiperOptions;
  slides: Slide[];
}
defineProps<IProps>();

const image = computed(() => {
  return (slide: Slide) => {
    return slide.grid_img || slide.header_img || slide.recommend_img;
  };
});
</script>

<template>
  <slot name="before"></slot>
  <div :class="['base-slider', $attrs.class]">
    <swiper :settings="settings">
      <swiper-slide
        class="slider-item"
        v-for="(slide, idx) in slides"
        :key="idx"
      >
        <slot name="slide" :slide="slide" :image="image">
          <img :src="image(slide)" alt="" />
          <div class="slider-title">{{ slide.title }}</div>
          <a
            :href="slide.link || '#'"
            target="_blank"
            class="stretched-link"
          ></a>
        </slot>
      </swiper-slide>
    </swiper>
    <slot name="afterWrapper"></slot>
  </div>
</template>
