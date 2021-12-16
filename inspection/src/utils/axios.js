import axios from "axios";

axios.create({
  validateStatus: (status) => status < 500,
})

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => {
    Promise.reject(e);
  }
);

export default axios;