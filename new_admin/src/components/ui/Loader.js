import React from 'react';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: props => `${props.height}vh`,
    color: '#27313e',
  },
});

const Loader = ({ height }) => {
  const classes = useStyles({
    height: height ? height : '50',
  });

  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: '#27313e' }} m={2} />
    </div>
  );
};

export default Loader;
