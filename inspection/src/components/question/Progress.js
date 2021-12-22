import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import timeIcon from '../../assets/images/icon/ic_time.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Grid } from '@mui/material';
import Timer from './Timer';

const useStyles = makeStyles({
  
})


const Progress = ({ inspectionIdx, inspectionName, questionCnt }) => {
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <>
      <Timer/>
      <Grid className="progress">
        <p className="txt">{inspectionName}</p>
        <Grid className="bar-wrap">
          <Grid className="bar" style={{ marginLeft: "45%" }}></Grid>
          <p className="value" style={{ marginLeft: "45%" }}>45%</p>
        </Grid>
      </Grid>
    </>
      
  )
}

export default Progress;