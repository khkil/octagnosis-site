import { Box } from '@mui/material';
import React from 'react';
import CustomHelmet from '../components/common/CustomHelmet';

const AuthLayout = ({ title, children }) => {
  return (
    <Box>
      <CustomHelmet title={title} />
      {children}
    </Box>
  );
};

export default AuthLayout;
