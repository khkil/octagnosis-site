import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logoutRequest } from '../../modules/auth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "red"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const goMainPage = () => {
    history.push("/");
  }

  const logout = () => {
    dispatch(logoutRequest());
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{background : "#27313e"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={goMainPage}
          >
            <img src="/public/images/logo_octa.png" style={{cursor: "pointer"}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}/>
          <Button color="inherit" onClick={logout}>
            <Typography variant="h6">로그아웃</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    // <AppBar className={classes.appBar} style={{backgroundColor : "#27313e", display: "block"}}>
    //   <Toolbar onClick={goMainPage}>
    //     <img src="/public/images/logo_octa.png" style={{cursor: "pointer"}}/>
    //     <Button color="inherit">Login</Button>
    //   </Toolbar>
    // </AppBar>
  );
};

export default Header;
