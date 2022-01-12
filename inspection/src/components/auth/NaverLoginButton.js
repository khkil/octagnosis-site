import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import NaverLogoImage from "../../assets/images/login/naver_logo.png"

const NaverLoginButton = () => {

  return (
    <Grid item>
      <Button
        fullWidth
        style={{background: "#03c75a"}}
        startIcon={<img src={NaverLogoImage} style={{height: "57px", width: "100%"}}/>}
        onClick={() => { alert(1); }}>
          <Typography color={"black"}>네이버로 로그인</Typography>
      </Button>
    </Grid>
  )
}
export default NaverLoginButton;