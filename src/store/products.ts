import { defineStore } from "pinia";
import { showroom } from "@/plugins/axios";
import { omitEmptyValues, toStringValues } from "@/mixins";
import { LocationQuery, stringifyQuery } from "vue-router";

interface ProductsState {
  products: Record<string, IResponse<Showroom>>;
  product: Record<number, ShowroomDetails>;
}

export const useStoreProducts = defineStore({
  id: "products",
  state: (): ProductsState => ({
    products: {},
    product: {},
  }),
  actions: {
    async fetchProducts(params: LocationQuery) {
      const hash =
        "?" + stringifyQuery(toStringValues(omitEmptyValues(params)));
      if (!(hash in this.products)) {
        this.products[hash] = (await showroom.get(hash)).data;
      }
      return this.products[hash];
    },
    async fetchProduct(id: number) {
      if (!(id in this.product)) {
        this.product[id] = (await showroom.get(`${id}`)).data;
      }
      return this.product[id];
    },
  },
});
