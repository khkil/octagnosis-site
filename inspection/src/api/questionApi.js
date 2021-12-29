import axios from "../utils/axios";

export const questionListApi = (inspectionIdx, page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/questions/inspections/${inspectionIdx}/pages/${page}`)
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