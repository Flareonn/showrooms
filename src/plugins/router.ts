import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home, Category, ErrorPage, Showroom } from "@/pages";
import { useStoreProducts } from "@/store/products";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/showroom/:id",
    name: "Showroom",
    component: Showroom,
    props: (route) => ({ id: route.params.id }),
    beforeEnter: async (to, from, next) => {
      try {
        await useStoreProducts().fetchProduct(+to.params.id);
      } catch (e) {
        next({ name: "Error" });
      } finally {
        next();
      }
    },
  },
  {
    path: "/category/:id(\\d+)+",
    name: "Category",
    component: Category,
    props: (route) => {
      const { id } = route.params;
      if ((id as string[]) && id.length >= 1) {
        return { id: id[id.length - 1] };
      } else {
        throw new Error("Id is undefined!");
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: ErrorPage,
  },
];

export const routeNames: Record<string, string> = Object.fromEntries(
  routes.map((route) => [route.name?.toString().toLowerCase(), route.name])
);

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;
