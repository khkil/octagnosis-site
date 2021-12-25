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
        <Typography variant="h6" noWrap>
          마이스허브 마스터
        </Typography>
   
      </Toolbar>
    </AppBar>
  );
};

export default Header;
