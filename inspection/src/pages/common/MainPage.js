import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInspectionList, FETCH_INPECTION_LIST } from "../../modules/inspection"
import Loader from '../../components/ui/Loader';

const MainPage = () => {

  const dispatch = useDispatch();
  const { isLoading, inspectionList } = useSelector(({ loading, inspection }) => ({
    isLoading: loading[FETCH_INPECTION_LIST],
    inspectionList: inspection.list
  }));

  useEffect(() => {
    const params = {
      payYn : "Y"
    }
    dispatch(fetchInspectionList(params));
  }, []);

  console.log("inspectionReducer", inspectionList);
  return (
    <Container maxWidth="xl">
      <Box>
        <Loader/>
      </Box>
    </Container>
  )
}

export default MainPage;