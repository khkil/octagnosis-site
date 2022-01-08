import React, { useEffect } from 'react';
import { Container, Box, Grid, Card, CardContent, TextField, Button, Typography, LinearProgress } from '@mui/material';

import Loader from '../../components/ui/Loader';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const MemberProgressList = () => {

  useEffect(() => {
  
  }, []);

  return (
    <Box mt={2}>
      <Card mb={6} style={{minHeight: 500}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            검사 상태
          </Typography>

          <Grid container spacing={6} mb={3}>
            <Grid item md={10}>
            <LinearProgressWithLabel value={30} />
            </Grid>
            <Grid item md={2}>
              <TextField
                id="zip"
                label="Zip"
                variant="outlined"
                fullWidth
                my={2}
              />
            </Grid>
          </Grid>
         
        </CardContent>
      </Card>
    </Box>
  )
}

export default MemberProgressList;