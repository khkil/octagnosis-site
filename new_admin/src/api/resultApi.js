import axios from '../utils/axios';

export const resultListApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/inspections/${inspectionIdx}/results`)
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
