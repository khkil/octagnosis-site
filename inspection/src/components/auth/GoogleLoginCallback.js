import React, { useEffect } from "react";
import queryString from 'query-string'
import { googleLoginApi } from "../../api/authApi";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST_SUCCESS } from "../../modules/auth";

const GoogleLoginCallback = ({ location }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const loginSuccess = (res) => ({
    type: LOGIN_REQUEST_SUCCESS,
    payload: res
  });

  const goSignUpPage = (id, name) => {
    alert("기타 정보를 입력해주세요.");
    history.push({
      pathname: `/auth/sign-up`,
      state: {
        userId: id,
        username: name
      }
    })
  }

  useEffect(() => {

    const { code } = queryString.parse(location.search);
    if(code){
      googleLoginApi(code)
      .then(res => {
        const { success, data } = res;
        console.log(data);
        /* if(Boolean(success)){
          dispatch(loginSuccess(res));
        }else{
          goSignUpPage(data.id, data.name);
        } */
      })
      .catch(e => {
        alert("구글 로그인에 실패 하였습니다.");
        console.error(e);
        //history.push("/auth/login");
      })
    }else{
 
    }
  }, []);

  return null;
}
export default GoogleLoginCallback;