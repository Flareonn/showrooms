<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
onMounted(() => {
  (document.querySelector("body") as HTMLBodyElement).classList.add(
    "error-page"
  );
});
onUnmounted(() => {
  (document.querySelector("body") as HTMLBodyElement).classList.remove(
    "error-page"
  );
});
</script>

<template>
  <div class="container">
    <div class="ms-auto col-12 col-lg-4 text-center">
      <div class="error-name">Страница не найдена</div>
      <div class="error-code">404</div>
      <div class="error-label">ошибка</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.error {
  &-page .container {
    font-family: "Playfair Display";
    font-style: normal;
    color: @g-black;
    font-weight: 400;
    font-size: 28px;
    line-height: 34px;
  }
  &-code {
    font-weight: 700;
    font-size: 197px;
    line-height: 236px;
    margin-top: -50px;
  }
}
</style>
