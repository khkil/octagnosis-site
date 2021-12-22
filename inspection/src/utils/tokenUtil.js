import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export const setAllTokens = (headers) => {
  if(!headers) return;
  const accessToken = headers[ACCESS_TOKEN];
  const refreshToken = headers[REFRESH_TOKEN];
  if(refreshToken && accessToken){
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }
}

export const removeAllToken = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
}

export const getRefreshToken = () => {
  return localStorage.refreshToken;
}

export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
}

export const getAccessToken = () => {
  return localStorage.accessToken;
}