import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home, Category, ErrorPage } from "@/pages";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category/:id(\\d+)+",
    name: "Category",
    component: Category,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: ErrorPage,
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;
