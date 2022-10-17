<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  id: string;
  isOpen?: boolean;
  placeholder?: string;
  classes?: {
    header: string;
    placeholder: string;
    body: string;
  };
}

const props = withDefaults(defineProps<IProps>(), {
  isOpen: false,
  placeholder: "placeholder",
  classes: () => ({
    body: "",
    header: "",
    placeholder: "",
  }),
});

const emit = defineEmits<{
  (e: "update:isOpen", isOpen: boolean): void;
}>();

const isOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});
const uniqueId = computed(() => `accordion-${props.id}`);
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
        <slot name="placeholder">
          <span>{{ placeholder }}</span>
          <i class="icon-arrow-accordion"></i>
        </slot>
      </div>
      <slot name="after-placeholder"></slot>
    </div>
    <div
      :id="uniqueId"
      class="collapse"
      :class="[classes.body, { show: isOpen }]"
    >
      <div class="accordion-body">
        <slot name="before-body"></slot>
        <slot name="body" :unique-id="uniqueId"></slot>
        <slot name="after-body"></slot>
      </div>
    </div>
  </div>
</template>
