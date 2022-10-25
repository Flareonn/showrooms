<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import type BasePopup from "./globals/BasePopup.vue";

interface IProps {
  user_name: string;
  text: string;
  comment_images: BaseImage[];
  children: UserComment[];
  time_published: string;
}
const props = defineProps<IProps>();

type UserReaction = "like" | "dislike";

const viewedImage = ref("");
const popup = ref<typeof BasePopup | null>(null);
const userReaction = ref<UserReaction | null>(null);
const stats = reactive<Record<UserReaction, number>>({
  like: 0,
  dislike: 0,
});

const date = computed(() =>
  dayjs(props.time_published).locale("ru").format("h:mm D MMMM YYYY")
);
const onImageClick = (image: string) => {
  viewedImage.value = image;
  popup.value?.open();
};
const onUserReaction = (reaction: UserReaction) => {
  if (userReaction.value !== reaction) {
    if (userReaction.value) {
      stats[userReaction.value]--;
    }
    stats[reaction]++;
    userReaction.value = reaction;
  }
};
</script>

<template>
  <li class="comment-row">
    <div class="comment-item">
      <base-avatar class="comment-avatar" />
      <div class="comment-info">
        <div class="comment-header">
          <div class="d-flex flex-column flex-md-row">
            <div class="comment-author">{{ user_name }}</div>
            <div class="comment-date">{{ date }}</div>
          </div>
          <ul class="comment-option">
            <li>
              <button class="option-edit">
                <i class="icon-edit"></i>
              </button>
            </li>
            <li>
              <button class="option-delete">
                <i class="icon-trash"></i>
              </button>
            </li>
          </ul>
        </div>
        <div class="comment-body">
          <p>{{ text }}</p>
          <img
            v-for="{ image_thumbnail, image } in comment_images"
            :key="image_thumbnail"
            :src="image_thumbnail"
            alt=""
            class="comment-body__image"
            @click="() => onImageClick(image)"
          />
          <base-popup class="comment-modal" ref="popup">
            <img :src="viewedImage" alt="" />
          </base-popup>
        </div>
        <div class="comment-footer">
          <button class="option-reply">Ответить</button>
          <ul class="option-rate">
            <li>
              <button
                class="option-like d-flex align-items-center"
                aria-label="like"
                @click="() => onUserReaction('like')"
              >
                <span>{{ stats.like }}</span>
                <i class="icon-thumb_up"></i>
              </button>
            </li>
            <li>
              <button
                class="option-dislike d-flex align-items-center"
                aria-label="dislike"
                @click="() => onUserReaction('dislike')"
              >
                <i class="icon-thumb_down"></i>
                <span>{{ stats.dislike }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul v-if="children.length">
      <base-comment
        v-for="(comment, idx) in children"
        :key="idx"
        v-bind="comment"
      />
    </ul>
  </li>
</template>
