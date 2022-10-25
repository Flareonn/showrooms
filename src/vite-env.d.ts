/// <reference types="vite/client" />

import type * as Types from "@/components/globals";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    BaseAvatar: typeof Types.default.BaseAvatar;
    BaseBreadcrumbs: typeof Types.default.BaseBreadcrumbs;
    BaseDropdown: typeof Types.default.BaseDropdown;
    BaseRating: typeof Types.default.BaseRating;
    BasePagination: typeof Types.default.BasePagination;
    BasePopup: typeof Types.default.BasePopup;
    CategoryList: typeof Types.default.CategoryList;
    BaseSlider: typeof Types.default.BaseSlider;
    FetchList: typeof Types.default.FetchList;
  }
}
