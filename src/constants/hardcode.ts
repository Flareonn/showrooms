// Файл содержит статичные данные, которые РЕКОМЕНДУЕТСЯ вынести на БЭКЕНД
export const filters: Filter[] = [
  {
    placeholder: "Новое/винтаж",
    field: "is_vintage",
    items: ["Новое", "Винтаж", "Не важно"],
  },
];

export const tags: String[] = [
  "По городам",
  "По стилю",
  "По товару",
  "По товару",
  "По сезону",
  "По целевой аудитории",
  "По сезону",
  "По стилю",
  "По сезону",
  "По городам",
  "По стилю",
  "По товару",
  "По товару",
  "По сезону",
  "По целевой аудитории",
  "По сезону",
  "По стилю",
  "По сезону",
  "По городам",
  "По стилю",
  "По товару",
  "По товару",
  "По сезону",
  "По целевой аудитории",
  "По сезону",
  "По стилю",
  "По сезону",
];

export const slides: Slide[] = [
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-16.jpg",
    title: "Long Fit T-shirt",
    name: "Long Fit T-shirt",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-14.jpg",
    title: "Grown cotton T-shirt",
    name: "Grown cotton T-shirt",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-detail-big-img1-1.jpg",
    title: "New Summer Collection",
    name: "New Summer Collection",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-15.jpg",
    title: "Jacket with pouch pockett",
    name: "Jacket with pouch pockett",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-10.jpg",
    title: "Jersey Graphic Tee Dolce",
    name: "Jersey Graphic Tee Dolce",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-9.jpg",
    title: "Cotton Baseball Cap",
    name: "Cotton Baseball Cap",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-13.jpg",
    title: "Название подборки",
    name: "Название подборки",
    link: "/",
  },
  {
    grid_img:
      "https://html.cwsthemes.com/liami/assets/images/resources/product-img1-11.jpg",
    title: "Название подборки",
    name: "Название подборки",
    link: "/",
  },
];

export const mockComments = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      user_name: "tikhu",
      avatar:
        "http://127.0.0.1:8000/media/avatars/tikhu/%D0%90%D1%84%D1%80%D0%BE%D0%B4%D0%B8%D1%82%D0%B01.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus risus purus, eget euismod velit ullamcorper vitae. Vivamus in tincidunt turpis, in luctus est. Sed efficitur mauris quis diam sodales hendrerit. Vestibulum eleifend turpis eget magna porta, ut laoreet enim varius. Nunc ut augue porta, rhoncus dui sit amet, maximus tellus. Ut dictum felis mi, sed faucibus est hendrerit sodales. Suspendisse volutpat elementum libero ac porta. Etiam mollis dolor mauris, vel viverra nulla dignissim nec. Integer accumsan condimentum est, vitae semper nulla rutrum vitae. Suspendisse sed arcu nunc. Donec vel rutrum urna. Duis maximus tellus massa, vel blandit leo mollis vel.",
      time_published: "2022-10-06T10:14:09.336000Z",
      parent: null,
      showroom: 22,
      selection: null,
      comment_images: [
        {
          image:
            "http://127.0.0.1:8000/media/users_uploaded/user_1/%D0%B1%D1%8B%D1%87%D0%BE%D0%BA_2%D0%B0.png",
        },
      ],
      children: [
        {
          user_name: "tikhu",
          avatar:
            "http://127.0.0.1:8000/media/avatars/tikhu/%D0%90%D1%84%D1%80%D0%BE%D0%B4%D0%B8%D1%82%D0%B01.png",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus risus purus, eget euismod velit ullamcorper vitae. Vivamus in tincidunt turpis, in luctus est.",
          time_published: "2022-10-06T10:14:28.398000Z",
          parent: 4,
          showroom: 22,
          selection: null,
          comment_images: [
            {
              image:
                "http://127.0.0.1:8000/media/users_uploaded/user_1/red_arrow.png",
            },
          ],
          children: [],
        },
      ],
    },
  ],
};

export const sorts: Sort[] = [
  {
    name: "По умолчанию",
    value: "",
    ordered: false,
  },
  {
    name: "По алфавиту",
    value: "name",
    ordered: true,
  },
  {
    name: "Сначала популярные",
    value: "ratings",
    ordered: true,
  },
  {
    name: "Новинки",
    value: "time_published",
    ordered: true,
  },
];
