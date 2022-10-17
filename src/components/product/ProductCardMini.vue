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

<script>
export default {
  name: 'ProductCardMini',
  /** @type {ShowroomItem} */
  props: {
    description: {
      type: String,
      required: false,
      default: '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    grid_img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>