<template>
  <div class="comment-wrapper">
    <div class="container">
      <div class="comment-header">
        <h3>Comments</h3>
        <button
          class="comment-anchor"
          @click.prevent="() => $refs.formTextarea.focus()"
        >
          Оставить комментарий
        </button>
      </div>
      <!-- Comments Start //-->
      <div class="comment-list">
        <ul>
          <base-comment
            v-for="(comment, idx) in comments.results"
            :key="idx"
            v-bind="comment"
          />
        </ul>
      </div>
      <!-- Pagination Start //-->
      <base-pagination :total-pages="comments.count_pages" />
      <!-- Pagination End //-->

      <!-- Comment Form Start //-->
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
            <form id="send-comment" @submit.prevent="createComment">
              <textarea
                ref="formTextarea"
                v-model="controls.text"
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
        <button type="submit" form="send-comment" :disabled="loading">
          Отправить комментарий
        </button>
      </div>
      <!-- Comment Form End //-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InputFile from '@/components/controls/InputFile.vue'
import { TypesGlobal } from '@/constants/store.types'
const initialControls = {
  text: '',
}
export default {
  name: 'ProductComments',
  components: {
    InputFile,
  },
  /**
   * @typedef Data
   * @property {ResponseComments} comments Список комментариев
   * @property {Object} controls Форма
   * @property {String} controls.text Текст комментария
   */
  /** @type {Data} */
  data() {
    return {
      /** @type {ResponseComments} */
      comments: {
        count: 1,
        count_pages: 0,
        links: {
          next: null,
          previous: null,
        },
        results: [],
      },
      controls: Object.assign({}, initialControls),
    }
  },
  fetchOnServer: false,
  /** @this Data */
  async fetch() {
    /** @type {ResponseComments} */
    this.comments = await this.$axios.$get(
      `/comments/showroom/${this.$route.params.id}`
    )
  },
  computed: {
    ...mapGetters({
      loading: TypesGlobal.getters.GET_LOADING,
    }),
  },
  methods: {
    /** @this Data */
    async createComment() {
      if (this.controls.text) {
        this.$store.commit(TypesGlobal.mutations.SET_LOADING, true)
        await setTimeout(() => {
          this.comments.push({
            user: {
              login: 'Логин пользователя',
              avatar:
                'https://html.cwsthemes.com/liami/assets/images/resources/product-img1-14.jpg',
            },
            time_published: this.$dayjs(),
            text: '',
            stats: {
              like: 0,
              dislike: 0,
            },
            ...this.controls,
          })
          this.controls = Object.assign({}, initialControls)
          this.$store.commit(TypesGlobal.mutations.SET_LOADING, false)
        }, 2000)
      }
    },
  },
}
</script>