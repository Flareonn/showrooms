import { defineStore } from "pinia";
import { showroom } from "@/plugins/axios";
import { cacheFunction, omitEmptyValues, toStringValues } from "@/utils";
import { LocationQuery, stringifyQuery } from "vue-router";

interface ProductsState {
  products: Record<string, Paginate<Showroom>>;
  product: Record<number, ShowroomDetails>;
  bestitems: Record<number, Paginate<ShowroomItem>>;
}

export const useStoreProducts = defineStore({
  id: "products",
  state: (): ProductsState => ({
    products: {},
    product: {},
    bestitems: {},
  }),
  actions: {
    async fetchProducts(params: LocationQuery) {
      const hash =
        "?" + stringifyQuery(toStringValues(omitEmptyValues(params)));
      return cacheFunction(
        hash,
        this.products,
        async () => (await showroom.get(hash)).data
      );
    },
    async fetchProduct(id: number) {
      return cacheFunction(
        id,
        this.product,
        async () => (await showroom.get(`${id}/`)).data
      );
    },
    async fetchBestItems(id: number) {
      return cacheFunction(
        id,
        this.bestitems,
        async () => (await showroom.get(`${id}/bestitems/`)).data
      );
    },
  },
});
