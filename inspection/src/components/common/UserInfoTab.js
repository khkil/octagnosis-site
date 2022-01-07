import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../modules/auth';
import { useHistory } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles({
  
  root: {
    position: "relative",
    left: "15%"
  },
  tab: {
    backgroundColor : "#425368!important",
    margin: "5px!important"
  }
})

const UserInfoTab = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { isLoggedIn } = useSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn
  }));

  const logout = () => {
    if(!confirm("로그아웃 하시겠습니까?")) return;
    history.push("/");
    dispatch(logoutRequest());
  }

  const goMyPage = () => {
    history.push("/mypage")    
  }

  const goLoginPage = () => {
    history.push("/auth/login")    
  }

  useEffect(() => {
    
  }, [])

  return (
    <Grid className={classes.root}>
      <Button className={classes.tab} startIcon={<InfoIcon />}  variant="contained" onClick={goMyPage}>내 정보</Button>

      {isLoggedIn ? 
        <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={logout}>로그아웃</Button> :
        <Button variant="contained" color="primary"  startIcon={<LoginIcon />}  onClick={goLoginPage}>로그인</Button>
      }

    </Grid>
  )
}

export default UserInfoTab;