import axios from "../utils/axios";

export const signUpApi = (params) => {
  params.role = "ROLE_MEMBER";
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/sign-up`, params)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const loginApi = (params) => {
  params.role = "ROLE_MEMBER";
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login`, params)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const kakaoLoginApi = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/kakao`, {
        code: code
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const naverLoginApi = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/naver`, {
        code: code
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const googleLoginApi = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/google`, {
        code: code
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const logoutApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/logout`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const validateTokenApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/validate-token`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });

}

export const updateMemberApi = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/members`, params)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}