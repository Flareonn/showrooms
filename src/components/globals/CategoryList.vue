<script setup lang="ts">
import { computed, toRef } from "vue";
import { useStoreCategories } from "@/store/categories";

interface IProps {
  categories: Category[];
  type?: "link" | "filter";
}

const props = withDefaults(defineProps<IProps>(), {
  type: "link",
});

const { type } = props;
const categories = toRef(props, "categories");
const emit = defineEmits<{
  (e: "click", id: number): void;
}>();

const flatCategories = useStoreCategories().map;

const hasSubCategory = computed(
  () => (category: Category) => category.category_children.length !== 0
);
const options = computed(() => {
  return {
    component: type === "link" ? "router-link" : "span",
    bind: (id: number) => {
      const parentOptions = hasSubCategory.value(flatCategories[id])
        ? {
            class: "collapsed",
            "aria-expanded": "false",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#category-${id}`,
          }
        : {};
      if (type === "link") {
        return {
          to: `/category${flatCategories[id].path}`,
          ...parentOptions,
        };
      } else if (type === "filter") {
        return {
          onclick: () => emit("click", id),
          ...parentOptions,
        };
      }
    },
  };
});
</script>

<template>
  <ul class="category-list">
    <li
      v-for="category in categories"
      :key="category.id"
      :class="{ 'has-subcategory': hasSubCategory(category) }"
    >
      <component v-bind="options.bind(category.id)" :is="options.component">
        {{ category.name }}
      </component>
      <category-list
        v-if="hasSubCategory(category)"
        :id="`category-${category.id}`"
        class="collapse"
        :categories="category.category_children"
        :type="type"
        @click="$emit('click', $event)"
      />
    </li>
  </ul>
</template>
