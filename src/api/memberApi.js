import axios from '../utils/axios';

export const memberGroupApi = memberIdx => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/members/${memberIdx}/group-info`)
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

export const memberProgressListApi = () => {
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

export const checkProgressHistoryApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/progress/inspections/${inspectionIdx}/check-history`)
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

export const deleteMemberAnswerApi = inspectionIdx => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/answers/inspections/${inspectionIdx}`)
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
