<script setup lang="ts">
interface IProps {
  id: number;
  name: string;
  grid_img?: string;
  average_star?: string | number;
  comments_number?: number;
  saved_number?: number;
  title?: string;
  description?: string;
}

withDefaults(defineProps<IProps>(), {
  grid_img: "",
  average_star: 0,
  comments_number: 0,
  saved_number: 0,
  title: "",
  description: "",
});
</script>

<template>
  <div class="product-item">
    <div class="product-image">
      <img :src="grid_img" :alt="title" />
      <label
        :for="`product-like-${id}`"
        class="product-fav"
        aria-label="Добавить в избранное"
      >
        <input :id="`product-like-${id}`" type="checkbox" />
        <i class="icon-like"></i>
      </label>
    </div>
    <div class="d-flex align-items-start justify-content-between">
      <div class="product-title">{{ name }}</div>
      <div class="product-rating">
        <i class="icon-star_full"></i>
        <span>{{ saved_number }}</span>
      </div>
    </div>
    <div class="product-except">{{ description }}</div>
    <div
      class="product-info d-flex align-items-center justify-content-between mt-3"
    >
      <div class="product-rate">
        <base-rating :id="id" :rating="average_star" editable />
      </div>
      <div class="product-comment-count">
        <i class="icon-comment"></i>
        <span>{{ comments_number }}</span>
      </div>
    </div>
    <router-link :to="`/showroom/${id}`" class="stretched-link"></router-link>
  </div>
</template>
