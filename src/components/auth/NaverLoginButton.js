import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import NaverLogoImage from "../../assets/images/login/naver_logo.png"

const NaverLoginButton = () => {

  const clickNaverLoginHandler = () => {

    const { origin } = location;
    const clientId = "TztATGRzvCRCJWUD1e4V";
    const redirectUrl = `${origin}/auth/login/naver`;
    const state = Math.floor(Math.random() * 10000000000) + 1;
    location.replace(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}`);
  }
  return (
    <Grid item mb={-1}> 
      <Button
        fullWidth
        style={{background: "#03c75a"}}
        startIcon={<img src={NaverLogoImage} style={{height: "40px", width: "100%"}}/>}
        onClick={clickNaverLoginHandler}>
          <Typography color={"black"}>네이버로 로그인</Typography>
      </Button>
    </Grid>
  )
}
export default NaverLoginButton;