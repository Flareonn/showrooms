import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";

interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const useStoreAuth = defineStore({
  id: "auth",
  state: (): AuthState => {
    const state: AuthState = {
      user: null,
      loggedIn: false,
    };
    const token = localStorage.getItem("user");
    if (token) {
      UserService.getUser().then((user) => {
        state.user = user;
        state.loggedIn = true;
      });
    }
    return state;
  },
  actions: {
    login(user: LoginDTO) {
      return AuthService.login(user)
        .then(this.loginSuccess)
        .catch(this.loginFailure);
    },
    loginSuccess() {
      UserService.getUser().then((user) => {
        this.user = user;
        this.loggedIn = true;
      });
    },
    loginFailure() {
      this.loggedIn = false;
      this.user = null;
    },
  },
});
