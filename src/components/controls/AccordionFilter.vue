<script setup lang="ts">
import Accordion from "@/components/controls/Accordion.vue";
import { useStoreFilters } from "@/store/filters";

import { ref } from "vue";
import { useRoute } from "vue-router";

interface IProps {
  id: string;
  open?: boolean;
}

const { open } = withDefaults(defineProps<IProps>(), {
  open: false,
});

const emit = defineEmits<{
  (e: "change", filters: Record<string, string[]>): void;
  (e: "clear"): void;
}>();

const storeFilters = useStoreFilters();
const route = useRoute();

const filters = storeFilters.filters;
let model = ref(
  Object.fromEntries(
    filters.map(({ field }) => [
      field,
      route.query[field]?.toString().split(",") || [],
    ])
  )
);

const onClearFilters = () => {
  model.value = storeFilters.getModel;
  emit("clear");
};
</script>

<template>
  <accordion
    :id="id"
    class="product-filter"
    :classes="{
      header: 'filter-heading',
      body: 'filter-box',
      placeholder: 'filter-title',
    }"
    :is-open="open"
  >
    <template #placeholder>
      <span>Фильтр</span><i class="icon-filter"></i>
    </template>
    <template #after-placeholder>
      <button class="btn btn-link filter-reset" @click="onClearFilters">
        Очистить
      </button>
    </template>
    <template #body>
      <accordion
        v-for="(filter, idx) in filters"
        :placeholder="filter.placeholder"
        :id="`filter-${id}-${idx}`"
        :key="idx"
        class="filter-item"
      >
        <template #body>
          <ul>
            <li
              v-for="option in filter.items"
              :key="`${filter.id}${option.value}`"
            >
              <label :for="option.value + filter.field">{{
                option.name
              }}</label>
              <input
                :id="option.value + filter.field"
                v-model="model[filter.field]"
                :value="option.value"
                type="checkbox"
                @change="emit('change', model)"
              />
            </li>
          </ul>
        </template>
      </accordion>
      <button class="btn btn-primary w-100 mt-4 d-block">Показать</button>
    </template>
  </accordion>
</template>
