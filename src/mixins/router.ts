import { omitEmptyValues, toStringValues } from "@/mixins";
import router from "@/plugins/router";
import { LocationQueryRaw } from "vue-router";

export const mergeQuery = (params: LocationQueryRaw) => {
  return {
    query: toStringValues(
      omitEmptyValues(
        Object.assign({}, router.currentRoute.value.query, params)
      )
    ),
  };
};
