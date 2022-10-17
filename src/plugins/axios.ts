import axios, { AxiosInstance } from "axios";

const debugWrapper = (instance: AxiosInstance) => {
  if (import.meta.env.DEV) {
    instance.interceptors.request.use((config) => {
      console.log(config.baseURL, config.url);
      return config;
    });
  }
};

axios.defaults.baseURL = "/api";
const showroom = axios.create({
  baseURL: axios.defaults.baseURL + "/showrooms/",
});

debugWrapper(axios);
debugWrapper(showroom);

export default axios;
export { showroom };
