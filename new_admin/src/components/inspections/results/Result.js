import React from 'react';
import { Box, Grid, Card, CardActions, CardContent, Button, Typography } from '@mui/material';

const Result = ({ resultName }) => {
  return (
    <Grid item sm={2}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {resultName}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
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
