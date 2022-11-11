import axios from "../../node_modules/axios/index";

export const getQuestions = async page => {
  const { data } = await axios.get(`/api/questions/inspections/1/pages/${page}`);
  return data;
}