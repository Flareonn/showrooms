import { omitEmptyValues, toStringValues } from "@/utils";
import router from "@/plugins/router";
import type { LocationQuery, RouteLocationRaw } from "vue-router";

export const mergeQuery = (params: LocationQuery): RouteLocationRaw => {
  return {
    query: toStringValues(
      omitEmptyValues(
        Object.assign({}, router.currentRoute.value.query, params)
      )
    ),
  };
};
