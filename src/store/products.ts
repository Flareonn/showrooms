import { defineStore } from "pinia";
import { showroom } from "@/plugins/axios";
import { omitEmptyValues } from "@/mixins";

interface ProductsState {
  products: Record<string, ResponseProducts>;
  product: Record<number, ShowroomDetails>;
}

export const useStoreProducts = defineStore({
  id: "products",
  state: (): ProductsState => ({
    products: {},
    product: {},
  }),
  actions: {
    async fetchProducts(params?: Record<string, string>) {
      const hash =
        "?" + new URLSearchParams(omitEmptyValues(params)).toString();
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
