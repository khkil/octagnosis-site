import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Drawer, Toolbar, Divider } from '@mui/material';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const drawerWidth = 242;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "4rem"
  },
}));

export const CommonLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Sidebar/>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}


export default CommonLayout;