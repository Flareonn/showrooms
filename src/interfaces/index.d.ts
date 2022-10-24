interface Slide {
  grid_img?: string;
  header_img?: string;
  recommend_img?: string;
  title: string;
  name: string;
  link?: string;
}
interface Category {
  id: number;
  name: string;
  title: string;
  category_children: Category[];
}
