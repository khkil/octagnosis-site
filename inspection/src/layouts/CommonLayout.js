import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import CustomHelmet from '../components/common/CustomHelmet';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: 10,
    minHeight: "68.1rem"
  },
}));

const CommonLayout = ({ children, title }) => {

  const classes = useStyles();
  
  return (
    <>
      <CustomHelmet title={title} />
      <Box className={classes.root}>
        <Header/>
        <main className={classes.content} >
          {children}
        </main>
        <Footer/>
      </Box>
    </>
  )
}
export default CommonLayout;