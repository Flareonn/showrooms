<template>
  <div class="showroom-categories">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <nuxt-link :to="`/category${category.path}`">{{
          category.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { TypesCategories } from '@/constants/store.types'
export default {
  name: 'ProductCategories',
  /**
   * @typedef Props
   * @property {Number[]} categoriesIds @see Category.id
   */
  /** @type {Props} */
  props: {
    categoriesIds: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    /**
     * @this Props
     * @return {Category[]}
     */
    categories() {
      return this.categoriesIds.map(
        this.$store.getters[TypesCategories.getters.GET_CATEGORY_BY_ID]
      )
    },
  },
}
</script>