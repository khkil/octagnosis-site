import { Add } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Result from './Result';

const ResultList = ({ resultList }) => {
  const [newResults, setNewResults] = useState([]);
  const addResult = () => {
    const result = {};
    setNewResults([...newResults, result]);
  };

  const changeName = () => {};
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Button variant="contained" startIcon={<Add />} onClick={addResult}>
            새 결과 추가
          </Button>
        </Grid>
        {resultList.map(({ resultIdx, resultName }) => (
          <Result key={resultIdx} resultIdx={resultIdx} resultName={resultName} />
        ))}
        {newResults.map((result, index) => (
          <Grid item sm={2} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <TextField label="Outlined" variant="outlined" />
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultList;
