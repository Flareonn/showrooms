interface Slide {
  grid_img: string;
  title: string;
  name: string;
  link?: string;
}

type Category = {
  id: number;
  name: string;
  title: string;
  category_children: Category[];
};

type CategoryDetails = Category & {
  parent: number | null;
  description: string;
  grid_img: string;
  detail_img: string;
  header_img: string;
  recommend_img: string;
};

type FlatCategories = Record<
  number,
  Category & {
    parentId: number;
    path: string;
  }
>;

interface Filter {
  placeholder: string;
  field: string;
  items: string[];
}

interface Sort {
  name: string;
  value: string;
  ordered: boolean;
}

interface Showroom {
  id: number;
  name: string;
  title: string;
  description: string;
  rating_user: boolean;
  average_star: string;
  saved_number: number;
  saved_user: boolean;
  grid_img: string;
  recommend_img: string;
  comments_number: number;
}

interface ShowroomDetails extends Showroom {
  addresses: string[]; // Список адресов шоурумов
  domains: string[]; // Список городов шоурумов
  showroom_phone: {
    phone_number: string;
  }[]; // Список номеров шоурума
  showroom_social: {
    link: string;
    social_icon: string; // Имя соц.сети
    social_name: string; // Иконка соц.сети
  }[]; // Список социальных сетей шоурума
  showroom_children: ShowroomDetails[] | [];
  header_img: string;
  detail_img: string;
  link: string; //  Официальная страница
  parent: number; //  Родительская категория шоурума
  is_vintage: boolean; // Флаг
  is_draft: boolean; // Флаг
  categories: number[]; //  Список идентификаторов категорий
  time_published: Date.UTC; //  Родительская категория шоурума
}

type Pagination = {
  count: number;
  count_pages: number;
  links: {
    next: string | null;
    previous: string | null;
  };
};

type ResponseProducts = Pagination & { results: Showroom[] };
