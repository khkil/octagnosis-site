import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CustomHelmet from '../components/common/CustomHelmet';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    padding: 10,
    minHeight: '68.1rem',
  },
}));

const CommonLayout = ({ children, title }) => {
  const classes = useStyles();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box>
      <CustomHelmet title={title} />
      <Box className={classes.root}>
        <Header />
        <main className={classes.content}>{children}</main>
        <Footer />
      </Box>
    </Box>
  );
};
export default CommonLayout;
