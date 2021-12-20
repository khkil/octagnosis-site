import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInspectionList } from "../../modules/inspection"


const MainPage = () => {

  const dispatch = useDispatch();
  const inspectionReducer = useSelector(state => state.inspectionReducer);

  useEffect(() => {
    const params = {
      payYn : "Y"
    }
    dispatch(fetchInspectionList(params));
  }, [])
  return (
    <Container maxWidth="xl">

      <Box>
        asd
      </Box>
    </Container>
  )
}

export default MainPage;