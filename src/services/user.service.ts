import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/auth/users/";

class UserService {
  async getUser() {
    return (await axios.get(API_URL + "me/", { headers: authHeader() })).data;
  }
}

export default new UserService();
