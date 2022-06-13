import axios from '../utils/axios';

export const memberProgressListApi = memberIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/progress`)
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

export const memberProgressDetailApi = ({ memberIdx, inspectionIdx }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/progress/inspections/${inspectionIdx}`)
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

export const deleteProgressApi = (memberIdx, inspectionIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/progress/inspections/${inspectionIdx}`)
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
