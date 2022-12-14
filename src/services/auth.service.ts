import axios from "axios";
const API_URL = "/auth/";

class AuthService {
  login(user: LoginDTO) {
    return axios.post(API_URL + "token/login/", user).then((response) => {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user: RegisterDTO) {
    return axios.post(API_URL + "users/", user).then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();
