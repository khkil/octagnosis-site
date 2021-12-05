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
    if(accessToken){
      config.headers['Authorization'] = accessToken;
    }
    if(refreshToken){
      config.headers['refreshToken'] = refreshToken;
    }
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
      reissueAccessToken()
      .then(res => {
        const { data, success } = res;
        if(success){
          console.log(data.accessToken);
          setAccessToken(data.accessToken);

        }
      })  
      .catch(e => {
      })
    }
    return Promise.reject(e);
  }
);



export default axios;
