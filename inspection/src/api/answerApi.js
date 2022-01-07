import axios from "../utils/axios";

export const insertMemberAnswer = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/answers`, params)
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