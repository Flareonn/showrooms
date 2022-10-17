<script setup lang="ts">
import { ref, computed } from 'vue';

interface IProps {
  id: string;
  placeholder?: string;
  classes?: {
    header: string,
    placeholder: string,
    body: string
  };
  withoutArrow?: boolean;
  items?: string[];
  initialOpen?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'placeholder',
  classes: () => ({
    body: "",
    header: "",
    placeholder: ""
  }),
  withoutArrow: false,
  items: () => [],
  initialOpen: false,
});

const isOpen = ref(false);
const uniqueId = computed(() => `accordion-${props.id}`)

const model = ref([]);
const clearModel = () => model.value = []
defineExpose({
  clearModel,
  model,
  id: props.id,
})
</script>

<template>
  <div class="accordion">
    <div
      class="accordion-heading"
      :aria-expanded="isOpen"
      :class="classes.header"
    >
      <slot name="before-placeholder"></slot>
      <div
        class="accordion-button collapsed"
        :data-bs-target="`#${uniqueId}`"
        data-bs-toggle="collapse"
        :class="classes.placeholder"
        @click="isOpen = !isOpen"
      >
        <span>{{ placeholder }}</span>
        <i v-if="!withoutArrow" class="icon-arrow-accordion"></i>
        <i
          v-else-if="classes.placeholder.includes('filter-title')"
          class="icon-filter"
        ></i>
      </div>
      <slot name="after-placeholder"></slot>
    </div>
    <div
      :id="uniqueId"
      class="collapse"
      :class="[classes.body, { show: initialOpen }]"
    >
      <div class="accordion-body">
        <slot name="before-body"></slot>
        <slot name="body" :unique-id="uniqueId">
          <ul>
            <li v-for="(item, idx) in items" :key="idx">
              <label :for="uniqueId + idx">{{ item }}</label>
              <input
                :id="uniqueId + idx"
                v-model="model"
                :name="uniqueId"
                type="checkbox"
                :value="item"
                @change="$emit('change', model)"
              />
            </li>
          </ul>
        </slot>
        <slot name="after-body"></slot>
      </div>
    </div>
  </div>
</template>