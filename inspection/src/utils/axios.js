import axios from "axios";
import { reissueAccessTokenApi } from "../api/authApi";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { getAccessToken, getRefreshToken, setAccessToken, setAllTokens } from "./tokenUtil";

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

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    const originalConfig = e.config;
    const { response } = e;

    if(response.status === 401){
      const loginPageUrl = "/auth/login";
      const mainPageUrl = "/";
      const { pathname } = window.location;
      if(loginPageUrl !== pathname && mainPageUrl !== pathname){
        alert("로그인이 필요한 서비스 입니다.");
        location.href = "/auth/login";
      }
    }
    return Promise.reject(e);
  }
);

export default axios;