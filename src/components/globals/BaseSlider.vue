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
  <slot name="before"></slot>
  <div :class="['base-slider', $attrs.class]">
    <!-- @ts-ignore -->
    <swiper v-bind="slider.settings">
      <swiper-slide
        class="slider-item"
        v-for="(slide, idx) in slider.slides"
        :key="idx"
      >
        <slot name="slide" :slide="slide">
          <img :src="slide.grid_img" alt="" />
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
