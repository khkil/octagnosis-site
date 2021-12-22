import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../modules/auth';
import { removeAllToken } from '../../utils/tokenUtil';

const useStyles = makeStyles({
  
  root: {
    position: "relative",
    left: "45%"
  },
  tab: {
    backgroundColor : "#425368!important",
    margin: "5px!important"
  }
})

const UserInfoTab = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutRequest());
  }

  useEffect(() => {
    
  }, [])

  return (
    <Grid className={classes.root}>
      <Button className={classes.tab} variant="contained">내 정보</Button>
      <Button className={classes.tab} variant="contained" onClick={logout}>로그아웃</Button>
    </Grid>
  )
}

export default UserInfoTab;