import axios from "axios";
import store from "../redux/store/index";
import { reissueAccessToken } from "../services/authService";
import { getAccessToken, getRefreshToken, setAccessToken } from "../services/tokenService";

axios.create({
  validateStatus: (status) => status < 500,
});


axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    console.log("==========================" + config.url + "================================")
    console.log("accessToken : " ,accessToken);
    console.log("refreshToken : ", refreshToken)
    if(accessToken){
      config.headers['Authorization'] = accessToken;
    }
    if(refreshToken){
      config.headers['refreshToken'] = refreshToken;
    }
    console.log("========================================================================")
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
    const { response, config } = e;
    if(response.status === 403){
      const test = await reissueAccessToken();
      console.log(test);
      /* reissueAccessToken()
      .then(res => {
        const { data, success } = res;
        if(success){
          setAccessToken(data.accessToken);
        }
      }); */  
      
    }
    return Promise.reject(e);
  }
);



export default axios;
