import { Button } from "@mui/material";
import React from "react";
import { KAKAO_API_KEY } from "../../constants";
const KakaoLogin = () => {

  const clickKakaoLoginHandler = () => {
    const redirectUrl = "http://localhost:3000/auth/login/kakao";
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`
  }

  return (
    <div>
      <div>
        <Button
          style={{"background": "#FADF0A"}}
          onClick={clickKakaoLoginHandler}>
          카카오 로그인
        </Button>
      </div>
    </div>
  )
}
export default KakaoLogin;