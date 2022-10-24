import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";

interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const useStoreAuth = defineStore({
  id: "auth",
  state: (): AuthState => ({
    user: null,
    loggedIn: false,
  }),
  actions: {
    loginWith(user: LoginDTO) {
      return AuthService.login(user).then(this.login).catch(this.logout);
    },
    async login() {
      const token = localStorage.getItem("user");
      if (token) {
        const user = await UserService.getUser();
        this.user = user;
        this.loggedIn = true;
      }
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
      AuthService.logout();
    },
  },
});
