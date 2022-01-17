import React, { useEffect } from "react";
import queryString from 'query-string'
import { Button } from "@mui/material";
import { kakaoLoginApi } from "../../api/authApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, LOGIN_REQUEST_SUCCESS } from "../../modules/auth";

const KaKaoLoginCallback = ({ location }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const loginSuccess = (res) => ({
    type: LOGIN_REQUEST_SUCCESS,
    payload: res
  })

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if(code){
      kakaoLoginApi(code)
      .then(res => {
        const { success, data } = res;
        if(Boolean(success)){
          dispatch(loginSuccess(res));
        }else{
          alert("기타 정보를 입력해주세요.");
          history.push({
            pathname: `/auth/sign-up`,
            state: {
              userId: data.id,
              username: data.name
            }
          })
        }
      })
      .catch(e => {
        alert("카카오 로그인에 실패 하였습니다.");
        console.error(e);
        history.push("/auth/login");
      })
    }else{

    }
  }, [])

  return null;
}
export default KaKaoLoginCallback;