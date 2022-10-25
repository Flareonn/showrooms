import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Home = () => import("@/pages/Home.vue");
const Category = () => import("@/pages/Category.vue");
const Showroom = () => import("@/pages/Showroom.vue");
const Selections = () => import("@/pages/Selections/index.vue");
const ErrorPage = () => import("@/pages/Error.vue");
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
    props: (route) => ({ id: +route.params.id }),
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
    path: "/selections/",
    name: "Selections",
    component: Selections,
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
