import React, { useEffect } from "react";
import queryString from 'query-string'
import { Button } from "@mui/material";
import { kakaoLoginApi } from "../../api/authApi";
import { useHistory } from "react-router-dom";

const KaKaoLoginCallback = ({ location }) => {

  const history = useHistory();
  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if(code){
      kakaoLoginApi(code)
      .then(( { success, data } ) => {
        if(success){
          history.push("/")
        }else{
          alert("기타 정보를 입력해주세요.");
          history.push({
            pathname: `/auth/signup`,
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