import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { KAKAO_API_KEY } from "../../constants";
import googleLogoImage from "../../assets/images/login/google_logo.png"
import { height } from "@mui/system";

const GoogleLoginButton = () => {

  const clickKakaoLoginHandler = () => {
    const googleClientId = "374986953581-6aknlgc3d16e15k504bq89ti8enoo2aa.apps.googleusercontent.com";
    const redirectUrl = `${origin}/auth/login/google`;
    location.replace(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email%20profile%20openid&access_type=offline`);
  }

  return (
    <Grid item mb={-1}>
      <Button
        fullWidth
        style={{ background: "white", border: "1px solid #ddd"}}
        startIcon={<img src={googleLogoImage} style={{height: "40px", padding: "4px" }}/>}
        onClick={clickKakaoLoginHandler}
      >
        <Typography color={"black"} >구글로 로그인</Typography>
      </Button>
    </Grid>
  )
}
export default GoogleLoginButton;