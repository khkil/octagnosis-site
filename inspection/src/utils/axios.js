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

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    const { response } = e;
    
    if(response.status === 401){
      const { pathname } = window.location;
      const mainPageUrl = "/";
      if(pathname.indexOf("auth") === -1 && mainPageUrl !== pathname){
        alert("로그인이 필요한 서비스 입니다.");
        location.href = "/auth/login";
      }
    }
    return Promise.reject(e);
  }
);

export default axios;