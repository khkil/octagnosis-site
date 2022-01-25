import React from 'react';
import { Grid, Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const MainPageInspection = ({ inspectionIdx, inspectionName }) => {
  const history = useHistory();
  const startInspection = () => {
    const link = `/inspections/${inspectionIdx}/pages/start`
    history.push(link);
  }
  return (
    <Grid item xs={8}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            {inspectionName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* adjective */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={startInspection}>검사시작</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default MainPageInspection;