import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { KAKAO_API_KEY } from "../../constants";
import kakaoLogoImage from "../../assets/images/login/kakao_logo.png"
import { height } from "@mui/system";

const KakaoLoginButton = () => {

  const clickKakaoLoginHandler = () => {
    const kakaoApiKey = "912d51fdaa37d227fda10a2696fe6895";
    const redirectUrl = "http://localhost:3000/auth/login/kakao";
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUrl}&response_type=code`
  }

  return (
    <Grid item mb={-1}>
      <Button
        fullWidth
        style={{"background": "rgb(249 224 0)"}}
        startIcon={<img src={kakaoLogoImage} style={{height: "40px", padding: "4px"}}/>}
        onClick={clickKakaoLoginHandler}
      >
        <Typography color={"black"} >카카오로 로그인</Typography>
      </Button>
    </Grid>
  )
}
export default KakaoLoginButton;