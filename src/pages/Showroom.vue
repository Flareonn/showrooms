<script setup lang="ts">
// import { TypesProducts, TypesMap } from '@/constants/store.types'
// import { getPlacemarks } from '@/mixins/utils'
// const ProductCategories = () => import('@/components/product/Categories.vue')
// const ProductComments = () => import('@/components/product/Comments.vue')
// const ProductCardMini = () => import('@/components/product/ProductCardMini.vue')

// export default {
//   name: 'ShowroomPage',
//   components: {
//     ProductCategories,
//     ProductComments,
//     ProductCardMini,
//   },
//   validate({ params }) {
//     return params.id
//   },
//   async asyncData({ store, route }) {
//     await store.dispatch(TypesMap.actions.FETCH)
//     /** @type {ShowroomDetails} */
//     const product = await store.dispatch(
//       TypesProducts.actions.FETCH,
//       route.params.id
//     )
//     /** @type {ResponseProductList} */
//     const productList = await store.dispatch(
//       TypesProducts.actions.FETCH,
//       route.params.id + '/bestitems'
//     )
//     return {
//       product,
//       productList,
//       sliderImage: product.showroom_detail_images[0].image,
//     }
//   },
//   head() {
//     return {
//       title: `Showroom: ${this.product.name}`,
//     }
//   },
//   computed: {
//     /** @return {Placemark[]} */
//     placemarks() {
//       return getPlacemarks([this.product])
//     },
//   },
// }
</script>

<template>
  <main class="page-wrapper">
    text
    <!-- Header Start \\-->
    <!-- Header End \\-->

    <!-- Breadcrumbs Start \\-->
    <!-- <base-breadcrumbs
      :custom-path="[{ title: 'Главная', ...$router.match('/') }]"
    /> -->
    <!-- Breadcrumbs End \\-->

    <!-- Showroom Content Start \\-->
    <!-- <div class="showroom-wrapper">
      <div class="container">
        <div class="grid">
          <div class="one">
            <div class="showroom-image">
              <div class="slider product-detail-img-nav position-relative">
                <div
                  v-for="{
                    image_thumbnail,
                    image,
                  } in product.showroom_detail_images"
                  :key="image_thumbnail"
                  class="product-detail-mini-img overflow-hidden"
                >
                  <img
                    class="img-fluid w-100"
                    :src="image_thumbnail"
                    :alt="product.title"
                    @click="sliderImage = image"
                  />
                </div>
              </div>
              <div class="slider product-detail-big-imgs position-relative">
                <div class="product-detail-big-img overflow-hidden">
                  <img :src="sliderImage" :alt="product.title" />
                </div>
              </div>
            </div>
            <div
              class="showroom-stats d-flex align-items-center justify-content-between"
            >
              <div class="showroom-rating">
                <base-rating :rating="product.average_star" editable />
                <div v-show="product.average_star" class="rating">
                  <i class="icon-star_full"></i>{{ product.average_star }}
                </div>
              </div>
              <div class="showroom-comments align-items-center">
                <div class="comment-label">Комментарии</div>
                <div class="comment-count">
                  <i class="icon-comment"></i>
                  <span>{{ product.comments_number }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="two">
            <div class="showroom-title">
              <h2>{{ product.name }}</h2>
            </div>
            <product-categories :categories-ids="product.categories" />
          </div>
          <div class="three">
            <div class="showroom-description">
              <p>{{ product.description.trim() }}</p>
            </div>
            <div class="showroom-favorite">
              <input id="product-like-button" type="checkbox" hidden />
              <label for="product-like-button">
                <i class="icon-like"></i>
                <span>Добавить в избранное</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Showroom Content  End \\-->

    <!-- Content Start \\-->
    <!-- <div v-if="productList.count" class="container">
      <div class="content">
        <h3 class="mb-5">Product List</h3>
        <div class="row">
          <div class="col-12">
            <div class="showroom-product-list row">
              <div
                v-for="(item, idx) in productList.results"
                :key="idx"
                class="col-6 col-md-4 col-lg-3"
              >
                <product-card-mini v-bind="item" />
              </div>
            </div>
            <base-pagination :total-pages="productList.count_pages" />
          </div>
        </div>
      </div>
    </div> -->

    <!-- Showroom Contacts Start \\-->
    <!-- <div class="showroom-contacts-wrapper">
      <h3 class="container">Showroom contacts</h3>
      <div class="showroom-contacts">
        <client-only v-if="placemarks.length">
          <yandex-map
            :coords="placemarks[0].coords"
            :controls="['smallMapDefaultSet']"
            zoom="15"
            :show-all-markers="placemarks.length !== 1"
            class="contacts-map"
          >
            <ymap-marker
              v-for="(placemark, idx) in placemarks"
              :key="idx"
              :marker-id="idx"
              v-bind="placemark"
            ></ymap-marker>
          </yandex-map>
        </client-only>
        <div class="contacts-info">
          <div class="showroom-title">{{ product.name }}</div>
          <div class="showroom-description">
            <p>{{ product.description }}</p>
          </div>
          <div class="showroom-links">
            <ul class="list-unstyled mb-0">
              <li
                v-for="({ phone_number }, idx) in product.showroom_phone"
                :key="idx"
              >
                <a :href="`tel:${phone_number}`">{{ phone_number }}</a>
              </li>
            </ul>
          </div>
          <div class="showroom-social">
            <ul
              v-if="product.showroom_social.length"
              class="list-unstyled mb-0"
            >
              <li v-for="social in product.showroom_social" :key="social.link">
                <a :href="social.link" target="_blank">
                  <img :src="social.social_icon" width="24" height="24" />
                </a>
              </li>
            </ul>
            <a :href="product.link" class="showroom-page">
              <span>Перейти на официальную страницу</span>
              <i class="icon-arrow_long"></i>
            </a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Showroom Contacts End \\-->

    <div class="container showroom-related">
      <!-- Related Start \\-->
      <!-- <related-content :products="product.showroom_children" /> -->
      <!-- Related End \\-->
    </div>
    <!-- Content End \\-->

    <!-- Comments Start \\-->
    <!-- <product-comments /> -->
    <!-- Comments End \\-->
  </main>
</template>
