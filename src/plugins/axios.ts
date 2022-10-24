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
const selections = axios.create({
  baseURL: axios.defaults.baseURL + "/selections/",
});

debugWrapper(axios);
debugWrapper(showroom);
debugWrapper(selections);

export default axios;
export { showroom, selections };
