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
    fetchProducts(params: LocationQuery) {
      const hash =
        "?" + stringifyQuery(toStringValues(omitEmptyValues(params)));
      return cacheFunction(
        hash,
        this.products,
        async (): Promise<Paginate<Showroom>> => (await showroom.get(hash)).data
      );
    },
    fetchProduct(id: number) {
      return cacheFunction(
        id,
        this.product,
        async (): Promise<ShowroomDetails> =>
          (await showroom.get(`${id}/`)).data
      );
    },
    fetchBestItems(id: number) {
      return cacheFunction(
        id,
        this.bestitems,
        async (): Promise<Paginate<ShowroomItem>> =>
          (await showroom.get(`${id}/bestitems/`)).data
      );
    },
  },
});
