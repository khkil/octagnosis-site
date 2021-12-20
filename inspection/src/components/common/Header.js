import React from 'react';
import { makeStyles } from '@mui/styles';
import headerIcon from '../../assets/images/common/logo_octa.png';
import Progress from './Progress';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    display: "block",
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    background: `url(${headerIcon})`
  },
  btns: {
    position: "relative",
    //left: "20%"
  },
  btn: {
    background : "white"
  }
})


const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div id="header">
      <div className="container">
        <h1 className="logo white">
          <a className={classes.header} onClick={() => { history.push("/inspections") }}>
            옥타그노시스 검사
          </a>
        </h1>
        <Progress/>
        <div className={classes.btns}>
          <Button variant="contained">로그인</Button>
          <Button variant="contained">회원가입</Button>
        </div>
      </div>
    </div>
  )
}

export default Header;