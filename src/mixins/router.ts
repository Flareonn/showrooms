import { omitEmptyValues, toStringValues } from "@/mixins";
import router from "@/plugins/router";

export const appendQuery = (
  params: Record<string, string | number | string[]>
) => {
  router.push({
    query: toStringValues(
      omitEmptyValues(
        Object.assign({}, router.currentRoute.value.query, params)
      )
    ),
  });
};
