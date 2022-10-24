<script setup lang="ts">
interface IProps {
  src?: string | null;
}
defineProps<IProps>();
</script>

<template>
  <component :is="src ? 'img' : 'div'" :src="src" alt="" class="base-avatar">
    <i class="icon-user"></i>
  </component>
</template>
