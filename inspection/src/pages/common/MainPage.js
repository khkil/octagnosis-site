import React, { useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInspectionList, FETCH_INPECTION_LIST_REQUEST } from "../../modules/inspection"
import Loader from '../../components/ui/Loader';
import MainPageInspection from '../../components/inspections/MainPageInspection';

const MainPage = () => {

  const dispatch = useDispatch();
  const { isLoading, inspectionList } = useSelector(({ loading, inspection }) => ({
    isLoading: loading[FETCH_INPECTION_LIST_REQUEST],
    inspectionList: inspection.list
  }));

  useEffect(() => {
    if(inspectionList.length > 0) return;
    const params = {
      payYn : "Y"
    }
    dispatch(fetchInspectionList(params));
  }, []);

  if(isLoading) return <Loader/>;
  return (
    <Container maxWidth="xl">
      <Box>
        <Grid container columns={16}>
          {inspectionList.map(({ inspectionIdx, inspectionName }) => (
            <MainPageInspection 
              key={inspectionIdx}
              inspectionIdx={inspectionIdx} 
              inspectionName={inspectionName}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default MainPage;