import router from "@/plugins/router";

export const appendQuery = (params: Record<string, string | number>) =>
  router.push({
    query: Object.assign({}, router.currentRoute.value.query, params),
  });
