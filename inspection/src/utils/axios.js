import axios from "axios";
import { reissueAccessTokenApi } from "../api/authApi";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { getAccessToken, getRefreshToken, setAccessToken, setAllTokens } from "./tokenUtil";

axios.create({
  validateStatus: (status) => status < 500,
})

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();


    if(accessToken){
      config.headers[ACCESS_TOKEN] = accessToken;
    }
    if(refreshToken){
      config.headers[REFRESH_TOKEN] = refreshToken;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  }
);

axios.interceptors.response.use(
  (config) => {

    setAllTokens(config.headers);
    
    return config;
  },
  (e) => {
    const originalConfig = e.config;
    const { response } = e;

    if(response.status === 401){
      originalConfig.retry = true;
      reissueAccessTokenApi()
      .then(response => {
        const { authorization } = response.headers;
        setAccessToken(authorization);
        location.reload();
        return Promise.resolve();
      }) 
      .catch(e => {
        alert("유효하지 않은 인증 정보입니다.")
        location.href = "/";
      })
    }
    return Promise.reject(e);
  }
);

export default axios;