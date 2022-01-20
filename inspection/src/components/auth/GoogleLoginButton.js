import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { KAKAO_API_KEY } from "../../constants";
import googleLogoImage from "../../assets/images/login/google_logo.png"
import { height } from "@mui/system";

const GoogleLoginButton = () => {

  const clickKakaoLoginHandler = () => {
    const kakaoApiKey = "";
    const redirectUrl = "";
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUrl}&response_type=code`
  }

  return (
    <Grid item mb={-1}>
      <Button
        fullWidth
        style={{ background: "white", boxShadow: "1px 1px 1px 1px #d7d7d7"}}
        startIcon={<img src={googleLogoImage} style={{height: "40px", padding: "4px" }}/>}
        onClick={clickKakaoLoginHandler}
      >
        <Typography color={"black"} >구글로 로그인</Typography>
      </Button>
    </Grid>
  )
}
export default GoogleLoginButton;