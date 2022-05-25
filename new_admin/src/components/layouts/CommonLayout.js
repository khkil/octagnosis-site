import React from 'react';
import { makeStyles } from '@mui/styles';
import { CssBaseline, Drawer, Toolbar, Divider, Box, Typography } from '@mui/material';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const drawerWidth = 242;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    marginLeft: '16rem',
  },
}));

export const CommonLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default CommonLayout;
