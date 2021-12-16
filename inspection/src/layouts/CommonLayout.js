import { makeStyles } from '@mui/styles';
import React from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const CommonLayout = ({ children }) => {

  const classes = useStyles();
  return (
    <div>
      <Header/>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  )
}
export default CommonLayout;