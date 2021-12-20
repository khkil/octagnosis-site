import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    minHeight: "100%",
    height: "80vh",
    color: "#27313e"
  },
})

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress style={{'color': '#27313e'}} m={2} />
    </div>
  );
}

export default Loader;