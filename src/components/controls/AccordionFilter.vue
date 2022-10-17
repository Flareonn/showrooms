
<script setup lang="ts">
import Accordion from '@/components/controls/Accordion.vue'
import { filters as hardFilters } from '@/constants/hardcode'

import {ref} from "vue";

interface IProps {
  id: string,
  open?: boolean
}

withDefaults(defineProps<IProps>(), {
  open: false
})

const emit = defineEmits<{
  (e: 'change', filters: Record<string, string>): void
}>();

const filterElements = ref<InstanceType<typeof Accordion>[]>([]);
const filters = ref<Filter[]>([
  {
    placeholder: 'Город',
    field: 'domains',
    items: [],
  },
])
filters.value = filters.value.concat(hardFilters)

const onSelectFilters = () => {
  const checkedFilters: Record<string, string> = {};
  filterElements.value.forEach((filter) => {
    if(filter.model.length) {
      checkedFilters[filter.id] = filter.model.join(',');
    }
  })
  emit('change', checkedFilters);
}
const onClearFilters = () => {
  filterElements.value.forEach(filter => filter.clearModel())
  emit('change', {})
}
</script>

<template>
  <accordion
    :id="id"
    class="product-filter"
    placeholder="Фильтр"
    :classes="{
      header: 'filter-heading',
      body: 'filter-box',
      placeholder: 'filter-title',
    }"
    without-arrow
    :initial-open="open"
  >
    <template #after-placeholder>
      <button class="btn btn-link filter-reset" @click="onClearFilters">
        Очистить
      </button>
    </template>
    <template #body>
      <accordion
        v-for="(filter, idx) in filters"
        :placeholder="filter.placeholder"
        :items="filter.items"
        :id="filter.field"
        :key="idx"
        ref="filterElements"
        class="filter-item"
        @change="onSelectFilters"
      />
      <button class="btn btn-primary w-100 mt-4 d-block">Показать</button>
    </template>
  </accordion>
</template>