<script setup lang="ts">
import type { AxiosStatic } from "axios";
import { ref, inject } from "vue";

import InputFile from "@/components/controls/InputFile.vue";
import BaseComment from "@/components/BaseComment.vue";

const text = "";
const formInput = ref<HTMLTextAreaElement | null>(null);

const axios = inject("axios") as AxiosStatic;
const id = inject("productId");

const comments: Paginate<UserComment> = (
  await axios.get(`/comments/showroom/${id}/`)
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
              <input-file
                id="images"
                placeholder=""
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
