import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "red"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

 

  return (
    <AppBar className={classes.appBar} style={{backgroundColor : "#27313e"}}>
      <Toolbar>
        <img src="/public/images/logo_octa.png"/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
