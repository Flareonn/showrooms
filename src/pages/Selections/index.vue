<script setup lang="ts">
import { tags } from "@/constants/hardcode";

import { useStoreSelections } from "@/store/selections";
import ProductCardMini from "@/components/product/ProductCardMini.vue";
import RelatedSlider from "@/components/sliders/Related.vue";
const { fetchSelections } = useStoreSelections();
</script>
<template>
  <div>
    <base-breadcrumbs />

    <div class="category-wrapper bg-none">
      <div class="container-fluid p-xl-0 d-flex flex-column flex-md-row">
        <div class="grid big">
          <div class="one">
            <div class="category-image big">
              <img
                src="https://html.cwsthemes.com/liami/assets/images/resources/post-img1-1.jpg"
                alt="Denim Jacket"
              />
            </div>
          </div>
          <div class="two">
            <div class="category-title"><h2>Denim Jacket</h2></div>
          </div>
          <div class="three">
            <div class="category-description">
              <p>
                Habitasse per feugiat aliquam luctus accumsan curae, suspendisse
                aliquam taciti eros neque, aenean sit iaculis risus commodo ut
                sociosqu rhoncus potenti tristique placerat sit tempus, duis
                erat feugiat cras sociosqu porta ut praesent, fermentum donec
                convallis tellus vulputate duis nibh rhoncus phasellus dui massa
                nisl.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="content">
        <base-tags :items="tags" />
        <div class="row">
          <div class="col-12">
            <Suspense>
              <fetch-list :fetch="() => fetchSelections({})">
                <template #default="{ item }">
                  <product-card-mini
                    v-bind="item"
                    :link="`/selections/${item.id}`"
                  />
                </template>
              </fetch-list>
            </Suspense>
          </div>
        </div>
      </div>
      <related-slider />
    </div>
  </div>
</template>
