<script setup lang="ts">
import { sorts } from "@/constants/hardcode";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <base-dropdown
    placeholder="Сортировка"
    :classes="{ button: 'btn-order' }"
    class="mb-5 mb-md-0 col-6 col-md-4 col-lg-6"
  >
    <template #menu>
      <li v-for="(item, idx) in sorts" :key="idx">
        <router-link
          class="dropdown-item"
          :to="{
            query: Object.assign({}, route.query, { ordering: item.value }),
          }"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.ordered" class="icon-order"></i>
        </router-link>
      </li>
    </template>
  </base-dropdown>
</template>
