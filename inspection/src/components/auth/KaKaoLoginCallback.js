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
      .then(data => {
        console.log("data : ", data);
        history.push("/auth/login");
      })
      .catch(e => {
        alert("카카오 로그인에 실패 하였습니다.");
        console.error(e);
        history.push("/auth/login");
      })
    }else{

    }
  }, [])

  return (
    <div>
      <div>
        카카오 로그인중
      </div>
    </div>
  )
}
export default KaKaoLoginCallback;