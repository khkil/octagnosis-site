import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { getAccessToken, getRefreshToken, setAllTokens } from "./tokenUtil";

axios.create({
  validateStatus: (status) => status < 500,
})

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    console.log("accessToken : ", accessToken);
    console.log("refreshToken : ", refreshToken);

    if(accessToken){
      config.headers[ACCESS_TOKEN] = accessToken;
    }
    if(refreshToken){
      config.headers[REFRESH_TOKEN] = refreshToken;
    }
    console.log(config);
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
    Promise.reject(e);
  }
);

export default axios;