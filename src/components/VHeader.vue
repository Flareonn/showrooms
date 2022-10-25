<script setup lang="ts">
import { useStoreAuth } from "@/store/auth";
import { useStoreCategories } from "@/store/categories";
import { reactive, ref, computed } from "vue";
import type { BasePopup } from "@/components/globals";
import InputPassword from "@/components/controls/InputPassword.vue";

interface IProps {
  layout: string;
}
const { layout } = defineProps<IProps>();
const { categories } = useStoreCategories();
const storeAuth = useStoreAuth();

const authPopup = reactive({
  currentTab: "Вход",
  tabs: {
    login: {
      name: "Вход",
    },
    register: {
      name: "Регистрация",
    },
  },
});
const initialControls = (): {
  login: LoginDTO;
  register: RegisterDTO & { passwordRepeat: string };
} => ({
  login: {
    username: "",
    password: "",
  },
  register: {
    email: "appavel2011@yandex.ru",
    password: "jzxhzhjh25252",
    passwordRepeat: "jzjhjzhj2525",
    username: "flareon",
  },
});
let controls = ref(initialControls());
const isVisibleMobileMenu = ref(false);
const popup = ref<typeof BasePopup | null>(null);

const currentTab = computed(
  () => (tabName: "login" | "register") =>
    authPopup.currentTab === authPopup.tabs[tabName].name
);

const successfullOperate = () => {
  controls.value = initialControls();
  popup.value?.close();
};

const login = async () => {
  await storeAuth.loginWith(controls.value.login);
  successfullOperate();
};
const register = async () => {
  await storeAuth.register(controls.value.register);
  successfullOperate();
};
</script>

<template>
  <header class="py-2">
    <div
      id="navbarNav"
      class="offcanvas offcanvas-start"
      :aria-hidden="!isVisibleMobileMenu"
      :aria-modal="isVisibleMobileMenu"
      :class="{ 'show visible': isVisibleMobileMenu }"
      :role="isVisibleMobileMenu ? 'dialog' : ''"
    >
      <div class="offcanvas-header">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="isVisibleMobileMenu = false"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="list-unstyled">
          <li><a href="#">Обо мне</a></li>
          <li><a href="#">Блог</a></li>
        </ul>
        <hr />
        <category-list :categories="categories" class="list-unstyled" />
        <hr />
        <div class="d-flex align-items-center mt-4">
          <a href="#" class="text-dark text-decoration-none">
            <i class="icon-socials-instagram"></i>
          </a>
          <a href="#" class="ms-3 text-dark text-decoration-none">
            <i class="icon-socials-telegram"></i>
          </a>
        </div>
      </div>
    </div>
    <div
      class="d-flex flex-wrap align-items-center justify-content-between"
      :class="[layout === 'user' ? 'container-fluid' : 'container']"
    >
      <button
        type="button"
        class="navbar-toggler d-flex d-md-none"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="isVisibleMobileMenu = true"
      >
        <i class="icon-burger"></i>
      </button>

      <div class="d-none d-md-flex align-items-center col-auto mb-2 mb-md-0">
        <a href="#" class="text-dark text-decoration-none">
          <i class="icon-socials-instagram"></i>
        </a>
        <a href="#" class="ms-3 text-dark text-decoration-none">
          <i class="icon-socials-telegram"></i>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 mb-md-0 d-none d-md-flex">
        <li>
          <router-link to="/" class="nav-link px-2 link-secondary"
            >Главная</router-link
          >
        </li>
        <li><a href="#" class="nav-link px-2 link-dark">Обо мне</a></li>
        <li><a href="#" class="nav-link px-2 link-dark">Блог</a></li>
      </ul>

      <div class="d-block d-md-none current-page">Главная</div>

      <div class="col-auto">
        <template v-if="storeAuth.user">
          <a
            data-toggle="modal"
            class="btn btn-link p-0 d-block d-sm-none"
            href="#userProfileModal"
          >
            <span class="d-none d-lg-inline-flex me-3">{{
              storeAuth.user.username
            }}</span>
            <base-avatar :src="storeAuth.user.avatar" />
          </a>
          <base-dropdown class="d-none d-sm-block">
            <template #placeholder>
              <span class="d-none d-lg-inline-flex me-3">{{
                storeAuth.user.username
              }}</span>
              <i class="icon-user"></i>
            </template>
            <template #menu>
              <li class="dropdown-item">
                <router-link to="/">Мой профиль</router-link>
              </li>
              <li class="dropdown-item">
                <a href="#" @click="storeAuth.logout">Выйти</a>
              </li>
            </template>
          </base-dropdown>
        </template>
        <template v-else>
          <button class="btn btn-link p-0">
            <i class="icon-user" @click="popup?.open"></i>
          </button>
        </template>
      </div>
    </div>
  </header>

  <base-popup class="auth-modal" ref="popup" v-if="!storeAuth.loggedIn">
    <div id="authForm" class="auth-modal-body">
      <div id="list-tab" class="nav auth-modal-head" role="tablist">
        <a
          v-for="tab in authPopup.tabs"
          :key="tab.name"
          href="#"
          :class="{ active: authPopup.currentTab === tab.name }"
          @click.prevent="authPopup.currentTab = tab.name"
        >
          {{ tab.name }}
        </a>
      </div>
      <div id="nav-tabContent" class="tab-list">
        <form
          :class="{ 'active show': currentTab('login') }"
          class="tab-pane fade"
          role="tabpanel"
          @submit.prevent="login"
        >
          <div class="auth-modal-content">
            <div class="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Ваш логин"
                autocomplete="username"
                v-model="controls.login.username"
              />
            </div>
            <div class="mb-2">
              <input-password
                placeholder="Ваш пароль"
                autocomplete="current-password"
                v-model="controls.login.password"
              />
            </div>
            <div class="d-flex justify-content-end">
              <a href="#">Забыли пароль?</a>
            </div>
          </div>
          <div class="auth-modal-footer">
            <div class="mb-3">
              <button class="btn btn-primary w-100 d-block" type="submit">
                Войти
              </button>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Войти с помощью</span>
              <ul class="list-unstyled mb-0 d-flex">
                <li>
                  <a href="#">
                    <i class="icon-socials-vk"></i>
                  </a>
                </li>
                <li class="ms-2">
                  <a href="#">
                    <i class="icon-socials-google"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <form
          :class="{ 'active show': currentTab('register') }"
          class="tab-pane fade"
          role="tabpanel"
          @submit.prevent="register"
        >
          <div class="auth-modal-content">
            <div class="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Ваша почта"
                v-model="controls.register.email"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Ваш логин"
                v-model="controls.register.username"
                required
              />
            </div>
            <div class="mb-3">
              <input-password
                placeholder="Ваш пароль"
                autocomplete="new-password"
                v-model="controls.register.password"
                required
              />
            </div>
            <div class="mb-5">
              <input-password
                placeholder="Повторите пароль"
                autocomplete="new-password"
                v-model="controls.register.passwordRepeat"
                required
              />
            </div>
            <div class="mb-3">
              <label for="policy2">
                <input id="policy2" type="checkbox" name="agree" required />
                <span
                  >Согласен с <a href="#">политикой конфиденциальности</a></span
                >
              </label>
            </div>
            <button class="btn btn-primary w-100 d-block">
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </base-popup>
</template>
