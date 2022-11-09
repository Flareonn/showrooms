<script setup lang="ts">
import { ref } from "vue";
import { AxiosKey, injectStrict } from "@/utils/keys";

import BaseComment from "@/components/BaseComment.vue";

interface IProps {
  id: number;
}
const props = defineProps<IProps>();
const text = "";
const formInput = ref<HTMLTextAreaElement | null>(null);

const axios = injectStrict(AxiosKey);

const comments: Paginate<UserComment> = (
  await axios.get(`/comments/showroom/${props.id}/`)
).data;
</script>

<template>
  <div class="comment-wrapper">
    <div class="container">
      <div class="comment-header">
        <h3>Comments</h3>
        <button
          class="comment-anchor"
          @click="() => (formInput as HTMLTextAreaElement).focus()"
        >
          Оставить комментарий
        </button>
      </div>

      <div class="comment-list">
        <ul>
          <base-comment
            v-for="(comment, idx) in comments.results"
            :key="idx"
            v-bind="comment"
          />
        </ul>
      </div>

      <base-pagination :total-pages="comments.count_pages" />

      <div class="comment-form">
        <div class="comment-box">
          <div class="author-avatar">
            <img
              src="https://html.cwsthemes.com/liami/assets/images/resources/product-img1-14.jpg"
              alt=""
            />
          </div>
          <div class="form-body">
            <div class="author-name">Логин пользователя</div>
            <form id="send-comment" @submit.prevent="">
              <textarea
                ref="formInput"
                v-model="text"
                name="comment"
                rows="3"
                placeholder="Написать текст..."
              ></textarea>
              <base-input
                component="file"
                id="images"
                accept="image/jpeg,image/png,image/gif"
              />
            </form>
          </div>
        </div>
        <button type="submit" form="send-comment">Отправить комментарий</button>
      </div>
    </div>
  </div>
</template>
