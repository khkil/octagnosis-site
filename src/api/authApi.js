import axios from '../utils/axios';

export const signUpApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/sign-up`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const checkIdApi = id => {
  const params = {
    id: id,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/check-id`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const loginApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const kakaoLoginApi = code => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/kakao`, {
        code: code,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const naverLoginApi = code => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/naver`, {
        code: code,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const googleLoginApi = code => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/login/google`, {
        code: code,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const logoutApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/logout`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const validateTokenApi = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/validate-token`)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateMemberApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/members`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sendVerifyEmailApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/send-sign-up-email`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sendFindIdEmailApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/send-find-id-email`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const verifyEmailApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/verify-email`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const checkEmailApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/check-email`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const resetPasswordApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/reset-password`, params)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const checkCodeApi = code => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/auth/check-code`, {
        groupCode: code,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
