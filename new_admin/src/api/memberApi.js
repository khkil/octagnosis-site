import axios from '../utils/axios';

export const memberListApi = params => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members`, {
        params: params,
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
