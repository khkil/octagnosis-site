import React from 'react';
import { Grid, Card, CardActions, CardContent, Button, Typography } from '@mui/material';

const Result = ({ resultName }) => {
  return (
    <Grid item sm={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {resultName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            상세정보
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Result;
