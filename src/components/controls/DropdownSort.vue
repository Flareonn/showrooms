<script setup lang="ts">
import { sorts } from "@/constants/hardcode";
import { useRoute } from "vue-router";
import { mergeQuery } from "@/utils/router";
const route = useRoute();
</script>

<template>
  <base-dropdown placeholder="Сортировка" :classes="{ button: 'btn-order' }">
    <template #menu>
      <li v-for="(item, idx) in sorts" :key="idx">
        <router-link
          class="dropdown-item"
          :to="mergeQuery({ ordering: item.value })"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.ordered" class="icon-order"></i>
        </router-link>
      </li>
    </template>
  </base-dropdown>
</template>
