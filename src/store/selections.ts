import { defineStore } from "pinia";
import { selections } from "@/plugins/axios";
import { cacheFunction, omitEmptyValues, toStringValues } from "@/utils";
import { LocationQuery, stringifyQuery } from "vue-router";

interface ProductsState {
  selections: Record<string, Paginate<SelectionItem>>;
}

export const useStoreSelections = defineStore({
  id: "products",
  state: (): ProductsState => ({
    selections: {},
  }),
  actions: {
    fetchSelections(params: LocationQuery) {
      const hash =
        "?" + stringifyQuery(toStringValues(omitEmptyValues(params)));
      return cacheFunction(
        hash,
        this.selections,
        async (): Promise<Paginate<Showroom>> =>
          (await selections.get(hash)).data
      );
    },
  },
});
