<script setup lang="ts">
interface IProps {
  grid_img: string;
  title: string;
  description: string;
  name: string;
  link: string;
}
defineProps<IProps>();
</script>

<template>
  <div class="product-item">
    <div class="product-image">
      <img :src="grid_img" :alt="title" />
      <div class="product-info">
        <div class="product-subtitle">{{ name }}</div>
        <div class="product-except">{{ description }}</div>
      </div>
    </div>
    <div class="product-title">{{ name }}</div>
    <a :href="link" target="_blank" class="stretched-link"></a>
  </div>
</template>
