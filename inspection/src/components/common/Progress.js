import React from 'react';
import { makeStyles } from '@mui/styles';
import timeIcon from '../../assets/images/icon/ic_time.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  timeIcon: {
    background: `url(${timeIcon}) no-repeat left center`,
    fontSize: "32px",
    paddingLeft: "32px",
    color: "#FFD62C"
  },
  
})


const Progress = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <div className="timer">
        <p className={classes.timeIcon}>16</p>
        <p className="txt-gray">/30</p>
      </div>
      <div className="progress">
        <p className="txt">검사명검사명검사명</p>
        <div className="bar-wrap">
          <div className="bar" style={{ marginLeft: "45%" }}></div>
          <p className="value" style={{ marginLeft: "45%" }}>45%</p>
        </div>
      </div>
    </>
      
  )
}

export default Progress;