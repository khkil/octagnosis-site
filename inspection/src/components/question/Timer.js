import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import timeIcon from '../../assets/images/icon/ic_time.png';
import { Grid } from '@mui/material';

const useStyles = makeStyles({
  timeIcon: {
    background: `url(${timeIcon}) no-repeat left center`,
    fontSize: "32px",
    paddingLeft: "32px",
    color: "#FFD62C"
  },
})

const Timer = () => {
  const classes = useStyles();
  return (
    <Grid className="timer">
      <p className={classes.timeIcon}>16</p>
      <p className="txt-gray">/30</p>
    </Grid>
  )
}

export default Timer;