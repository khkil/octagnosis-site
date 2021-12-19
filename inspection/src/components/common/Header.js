import React from 'react';
import { makeStyles } from '@mui/styles';
import headerIcon from '../../assets/images/common/logo_octa.png';
import timeIcon from '../../assets/images/icon/ic_time.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
//import timeIcon from '../../assets/images/common/headline.png',

const useStyles = makeStyles({
  timeIcon: {
    background: `url(${timeIcon}) no-repeat left center`,
    fontSize: "32px", 
    paddingLeft: "32px", 
    color: "#FFD62C"
  },
  header : {
    display: "block",
    width: "100%",
    height: "100%",
    textIndent: "-9999px",
    background: `url(${headerIcon})`
  }
})


const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div id="header">
        <div className="container">
            <h1 className="logo white">
              <a className={classes.header} onClick={() => { history.push("/inspections")}}>옥타그노시스 검사</a>
            </h1>
            <div className="timer">
                <p className={classes.timeIcon}>16</p>
                <p className="txt-gray">/30</p>
            </div>
            <div className="progress">
                <p className="txt">검사명검사명검사명</p>
                <div className="bar-wrap">
                    <div className="bar" style={{marginLeft: "45%"}}></div>
                    <p className="value" style={{marginLeft: "45%"}}>45%</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header;