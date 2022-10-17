<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  id: number;
  rating?: string | number;
  editable?: boolean;
  maxRating?: number;
}
const { maxRating, rating } = withDefaults(defineProps<IProps>(), {
  editable: false,
  rating: 0,
  maxRating: 5
})
const emit = defineEmits<{
  (e: 'change', rating: number): void
}>();

function normalizeRating(value: string | number, maxRating: number) {
  return Math.abs(+value - (maxRating + 1))
}
const isCurrentRating = computed(() => {
  return (value: number) => {
    return normalizeRating(value, maxRating) === Math.round(ratingNumber.value)
  }
})
const ratingNumber = computed(() => +rating)
const starType = computed(() => {
  return (number: number) => number <= ratingNumber.value ? 'full' : 'empty';
})
const handlerRatingClick = ({target}: Event) => {
  emit('change', normalizeRating((target as HTMLInputElement).value, maxRating))
}
</script>

<template>
  <ul
    v-if="editable"
    class="rating-fully editable d-flex justify-content-end"
    :class="{ empty: !ratingNumber }"
  >
    <input
      v-for="(number, idx) in maxRating"
      :key="idx"
      type="radio"
      :name="`rate${id}`"
      :value="number"
      :checked="isCurrentRating(number)"
      @change="handlerRatingClick"
    />
  </ul>
  <ul v-else class="rating-fully d-flex">
    <li v-for="(number, idx) in maxRating" :key="idx">
      <i :class="`icon-star icon-star_${starType(number)}`" />
    </li>
  </ul>
</template>