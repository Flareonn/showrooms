import { defineStore } from "pinia";
import axios from "axios";

interface CategoriesState {
  categories: Category[];
  map: FlatCategories;
  category: Record<string, CategoryDetails>;
}

const createFlatCategories = (
  cats: Category[],
  path?: string,
  parentId: number = 0
) => {
  let categories: FlatCategories = {};
  cats.forEach((category) => {
    categories[category.id] = {
      ...category,
      parentId,
      path: [path, category.id].join("/"),
    };
    if (category.category_children.length) {
      categories = {
        ...categories,
        ...createFlatCategories(
          category.category_children,
          parentId ? `/${parentId}/${category.id}` : `/${category.id}`,
          category.id
        ),
      };
    }
  });
  return categories;
};

export const useStoreCategories = defineStore({
  id: "category",
  state: (): CategoriesState => ({
    categories: [],
    map: {},
    category: {},
  }),
  actions: {
    async requestCategories() {
      try {
        const categories: Category[] = (await axios.get("/categories/")).data;
        this.categories = categories;
        this.map = createFlatCategories(categories);
      } catch (e) {
        console.log(e);
      }
    },
    async requestCategory(path: string) {
      if (!(path in this.category)) {
        const category: CategoryDetails = (
          await axios.get(`/categories/${path}/`)
        ).data;
        this.category[path] = category;
      }
      return this.category[path];
    },
  },
});
