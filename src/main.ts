import "./assets/style/styles.less";
import "dayjs/locale/ru";
import { useStoreCategories } from "@/store/categories";
import { createApp } from "vue";
import VueAxios from "vue-axios";
import Axios from "@/plugins/axios";
import Router from "@/plugins/router";
import Pinia from "@/plugins/store";
import globalComponents from "@/plugins/globals";
// @ts-ignore
import YmapPlugin from "vue-yandex-maps";
import App from "./App.vue";
import { useStoreFilters } from "./store/filters";
import { useStoreAuth } from "./store/auth";

const app = createApp(App);

app
  .use(VueAxios, Axios)
  .use(Router)
  .use(Pinia)
  .use(YmapPlugin, {
    apiKey: import.meta.env.YANDEX_MAP_API_KEY,
    lang: "ru_RU",
    coordorder: "latlong",
    enterprise: false,
    version: "2.1",
  })
  .provide("axios", Axios);

Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component);
});

await useStoreCategories().requestCategories();
await useStoreFilters().requestFilters();
await useStoreAuth().login();

app.mount("#app");
