/// <reference types="vite/client" />

import type {
  BaseBreadcrumbs,
  BaseDropdown,
  BaseRating,
  BasePagination,
  BasePopup,
  CategoryList,
  BaseSlider,
} from "@/components/globals";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BaseAvatar: typeof Types.default.BaseAvatar;
    BaseBreadcrumbs: typeof BaseBreadcrumbs;
    BaseDropdown: typeof BaseDropdown;
    BaseRating: typeof BaseRating;
    BasePagination: typeof BasePagination;
    BasePopup: typeof BasePopup;
    CategoryList: typeof CategoryList;
    BaseSlider: typeof BaseSlider;
  }
}
