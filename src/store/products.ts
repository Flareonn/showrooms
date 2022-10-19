import { defineStore } from "pinia";
import { showroom } from "@/plugins/axios";
import { cacheFunction, omitEmptyValues, toStringValues } from "@/utils";
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
      if (!("bestitems" in this.product[id])) {
        this.product[id].bestitems = (
          await showroom.get(`${id}/bestitems/`)
        ).data;
      }
      return this.product[id].bestitems as IResponse<ShowroomItem>;
    },
  },
});
