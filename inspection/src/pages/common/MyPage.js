import React, { useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/ui/Loader';

const MyPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  
  }, []);

  return (
    <Container maxWidth="xl">
      <Box>
        마이 페이지
      </Box>
    </Container>
  )
}

export default MyPage;