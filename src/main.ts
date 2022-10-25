import "./assets/style/styles.less";
import { useStoreCategories } from "@/store/categories";
import { createApp } from "vue";
// @ts-ignore
import YmapPlugin from "vue-yandex-maps";
import VueAxios from "vue-axios";
import DKToast from "vue-dk-toast";

import Axios from "@/plugins/axios";
import Router from "@/plugins/router";
import Pinia from "@/plugins/store";
import globalComponents from "@/plugins/globals";

import App from "./App.vue";
import { useStoreFilters } from "./store/filters";
import { useStoreAuth } from "./store/auth";
import { AxiosKey } from "./utils/keys";

const app = createApp(App);

app
  .use(VueAxios, Axios)
  .use(Router)
  .use(Pinia)
  .use(DKToast)
  .use(YmapPlugin, {
    apiKey: import.meta.env.YANDEX_MAP_API_KEY,
    lang: "ru_RU",
    coordorder: "latlong",
    enterprise: false,
    version: "2.1",
  })
  .provide(AxiosKey, Axios);

Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component);
});

await useStoreCategories().requestCategories();
await useStoreFilters().requestFilters();
await useStoreAuth().login();

app.mount("#app");
