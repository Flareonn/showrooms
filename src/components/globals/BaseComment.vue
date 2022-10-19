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
          <base-popup v-if="current" class="comment-modal">
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

<script>
import '@/constants/typedef'
import BaseAvatar from './BaseAvatar.vue'
import { TypesPopup } from '@/constants/store.types'
/** @typedef {'like'|'dislike'} Reaction */
/**
 * @typedef Stats
 * @property {Number} [like=0]
 * @property {Number} [dislike=0]
 */
export default {
  name: 'BaseComment',
  components: { BaseAvatar },
  /**
   * @typedef Props
   * @property {Stats} initialStats
   * @property {String} text Содержимое комментария
   * @property {String} time_published Дата в формате UTC
   * @property {UserComment[]} children Ответы на комментарий
   * @property {String} user_name Никнейм пользователя
   * @property {Object[]} comment_images Изображения, прикреплённые к комментарию
   * @property {?String} avatar Аватар пользователя
   */
  /** @type {Props} */
  props: {
    initialStats: {
      type: Object,
      required: false,
      default() {
        return {
          like: 0,
          dislike: 0,
        }
      },
    },
    text: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/prop-name-casing
    time_published: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/prop-name-casing
    children: {
      type: Array,
      required: false,
      default: () => [],
    },
    // eslint-disable-next-line vue/prop-name-casing
    user_name: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/prop-name-casing
    comment_images: {
      type: Array,
      required: false,
      default: () => [],
    },
    avatar: {
      type: String,
      required: false,
      default: '',
    },
  },
  /**
   * @typedef Data
   * @property {Stats} stats
   * @property {?Reaction} userReaction Реакция пользователя
   * @property {?String} viewedImage Выбранное изображение для просмотра
   * @property {String} popup Ключ к попап-окну для просмотра изображения
   */
  /**
   * @type {Data}
   * @this {Props}
   */
  data() {
    return {
      stats: this.initialStats,
      userReaction: null,
      viewedImage: null,
      popup: this.user_name + this.time_published,
    }
  },
  computed: {
    /** @return {String} Форматтированная дата комментария */
    date() {
      return this.$dayjs(this.time_published).format('h:mm D MMMM YYYY')
    },
    /** @return {Boolean} Открыт ли предпросмотр изображения коментария */
    current() {
      return (
        this.$store.getters[TypesPopup.getters.CURRENT_POPUP] === this.popup &&
        this.viewedImage
      )
    },
  },
  methods: {
    /**
     * Обработчик пользовательских реакций.
     * @param {"like"|"dislike"} reaction
     * @this Data
     */
    onUserReaction(reaction) {
      if (this.userReaction !== reaction) {
        if (this.userReaction) {
          this.stats[this.userReaction]--
        }
        this.stats[reaction]++
        this.userReaction = reaction
      }
    },
    /**
     * Обработчик открытия предпросмотра изображения
     * @param {String} image
     */
    onImageClick(image) {
      this.viewedImage = image
      this.$store.commit(TypesPopup.mutations.OPEN_POPUP, this.popup)
    },
  },
}
</script>
