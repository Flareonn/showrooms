<script setup lang="ts">
import { ref } from "vue";
import { useStoreProducts } from "@/store/products";
import ProductCategories from "@/components/product/Categories.vue";
import ProductComments from "@/components/product/ProductComments.vue";
import RelatedSlider from "@/components/sliders/RelatedSlider.vue";
import ProductCardMini from "@/components/product/ProductCardMini.vue";
interface IProps {
  id: number;
}

const storeProducts = useStoreProducts();

const props = defineProps<IProps>();
const product = ref(storeProducts.product[props.id]);
const productSlider = ref(product.value.showroom_detail_images[0].image);

const fetchBestItems = () => storeProducts.fetchBestItems(props.id);
</script>

<template>
  <main class="page-wrapper" v-if="product">
    <base-breadcrumbs />

    <div class="showroom-wrapper">
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
                    @click="productSlider = image"
                  />
                </div>
              </div>
              <div class="slider product-detail-big-imgs position-relative">
                <div class="product-detail-big-img overflow-hidden">
                  <img :src="productSlider" :alt="product.title" />
                </div>
              </div>
            </div>
            <div
              class="showroom-stats d-flex align-items-center justify-content-between"
            >
              <div class="showroom-rating">
                <base-rating :rating="product.average_star" :id="1" editable />
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
    </div>

    <div class="container">
      <div class="content">
        <h3 class="mb-5">Product List</h3>
        <div class="row">
          <div class="col-12">
            <Suspense>
              <template #default>
                <fetch-list :fetch="fetchBestItems">
                  <template #default="{ item }">
                    <product-card-mini v-bind="item" />
                  </template>
                </fetch-list>
              </template>
              <template #fallback> "LOADING" </template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>

    <div class="showroom-contacts-wrapper">
      <h3 class="container">Showroom contacts</h3>
      <div class="showroom-contacts">
        <!-- <client-only v-if="placemarks.length">
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
        </client-only> -->
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
    </div>

    <div
      class="container showroom-related"
      v-if="product.showroom_children.length"
    >
      <RelatedSlider />
    </div>

    <Suspense>
      <product-comments :id="id" />
    </Suspense>
  </main>
</template>
