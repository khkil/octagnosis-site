import axios from '../utils/axios';

export const memberRankApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/ranks/inspections/${inspectionIdx}`)
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
