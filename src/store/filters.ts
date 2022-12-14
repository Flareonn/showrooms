import { defineStore } from "pinia";
import axios from "axios";

interface FiltersState {
  filters: Filter[];
}

export const useStoreFilters = defineStore({
  id: "filters",
  state: (): FiltersState => ({
    filters: [],
  }),
  actions: {
    async requestFilters() {
      this.filters = (await axios.get("/get-filter/")).data;
    },
  },
  getters: {
    getModel(): Record<string, []> {
      return Object.fromEntries(this.filters.map(({ field }) => [field, []]));
    },
  },
});
