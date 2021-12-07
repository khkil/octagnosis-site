import axios from "axios";
import { reissueToken } from "../redux/actions/authActions";
import store from "../redux/store/index";
import { reissueAccessToken, validateToken } from "../services/authService";
import { getAccessToken, getRefreshToken, setAccessToken } from "../services/tokenService";

const { dispatch } = store;

axios.create({
  validateStatus: (status) => status < 500,
});


axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if(accessToken){
      config.headers['Authorization'] = accessToken;
    }
    if(refreshToken){
      config.headers['refreshToken'] = refreshToken;
    }

    //dispatch(validateToken());
    

    /* console.log("==========================" + config.url + "================================")
    console.log("accessToken : " ,accessToken);
    console.log("refreshToken : ", refreshToken)
    console.log("========================================================================") */

    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    const originalConfig = e.config;
    const { response, config } = e;
    if(response.status === 403 && config.url === '/api/auth/validate-token' && !originalConfig.retry){
      originalConfig.retry = true;
      dispatch(reissueToken());
    }
    return Promise.reject(e);
  }
);



export default axios;
