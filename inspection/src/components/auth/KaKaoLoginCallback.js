import React, { useEffect } from "react";
import queryString from 'query-string'
import { Button } from "@mui/material";
import { kakaoLoginApi } from "../../api/authApi";
const KaKaoLoginCallback = ({ location }) => {

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if(code){
      kakaoLoginApi(code)
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.error(e);
      })
      console.log(code);
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