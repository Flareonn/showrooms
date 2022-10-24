<script setup lang="ts">
interface IProps {
  items?: {
    id: string | number;
    name: string | number;
  }[];
  link: string;
}
withDefaults(defineProps<IProps>(), {
  items: () => [],
});
</script>

<template>
  <div v-if="items.length" class="tags-wrapper">
    <ul>
      <li v-for="(item, idx) in items" :key="idx">
        <router-link :to="`/${link}/${item.id}`">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
