<script setup lang="ts">
import VHeader from "@/components/VHeader.vue";
import VFooter from "@/components/VFooter.vue";
import { useRouter } from "vue-router"
const router = useRouter()
const layout = router.currentRoute.value.name;
</script>

<template>
  <div class="page-wrapper" v-if="layout !== 'Error'">
      <v-header layout="default" />
      <router-view />
      <v-footer />
  </div>
  <router-view v-else />
</template>