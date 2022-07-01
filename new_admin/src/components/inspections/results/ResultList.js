import { Box, Grid } from '@mui/material';
import React from 'react';
import Result from './Result';

const ResultList = ({ resultList }) => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {resultList.map(({ resultIdx, resultName }) => (
          <Result key={resultIdx} resultIdx={resultIdx} resultName={resultName} />
        ))}
      </Grid>
    </Box>
  );
};

export default ResultList;
