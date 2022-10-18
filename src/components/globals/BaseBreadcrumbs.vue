<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStoreCategories } from "@/store/categories";

type BreadCrumb = {
  path: string;
  title: string;
};
interface IProps {
  customPath?: BreadCrumb[];
}
const props = withDefaults(defineProps<IProps>(), {
  customPath: () => [],
});

const store = useStoreCategories();
const route = useRoute();

const crumbs = computed(() => {
  if (props.customPath.length) {
    return props.customPath;
  }
  const params = route.path.startsWith("/")
    ? route.path.substring(1).split("/")
    : route.path.split("/");
  const crumbs: BreadCrumb[] = [];
  params.reduce((prev, curr) => {
    const path = `${prev}/${curr}`;

    const category = store.map[Number(curr)];
    if (category) {
      crumbs.push({
        path,
        title: category.name,
      });
    }
    return path;
  });
  return [{ path: "", title: "Главная" }].concat(crumbs);
});
</script>

<template>
  <div class="breadcrumbs">
    <div class="container">
      <ul>
        <li v-for="link in crumbs" :key="link.path">
          <router-link :to="`/${link.path}`">{{ link.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
