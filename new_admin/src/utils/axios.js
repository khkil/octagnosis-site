import axios from "axios";
import { getMhxDomain } from "./domainUtil";
let store;

export const injectStore = (_store) => {
  store = _store;
};

axios.create({
  //서버 응답 HTTP 상태 코드
  validateStatus: (status) => status < 500,
});

axios.interceptors.request.use((config) => {
  const { domain_number } = store.getState().domain;
  const mhxDomain = getMhxDomain();
  config.headers["MHX_DOMAIN"] = mhxDomain;
  return config;
});

export default axios;
