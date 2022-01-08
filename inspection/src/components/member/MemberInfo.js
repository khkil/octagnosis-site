import React, { useEffect } from 'react';
import { Container, Box, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';

import Loader from '../ui/Loader';

const MemberInfo = () => {

  useEffect(() => {
  
  }, []);

  return (
    <Box mt={4}>
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            내정보
          </Typography>

          <Grid container spacing={3} mb={3}>
            <Grid item md={6}>
              <TextField
                id="first-name"
                label="First name"
                variant="outlined"
                fullWidth
                my={2}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="last-name"
                label="Last name"
                variant="outlined"
                defaultValue="Lavender"
                fullWidth
                my={2}
              />
            </Grid>
          </Grid>

          <Grid container spacing={6} mb={3}>
            <Grid item md={6}>
              <TextField
                id="city"
                label="City"
                variant="outlined"
                fullWidth
                my={2}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="state"
                label="State"
                variant="outlined"
                fullWidth
                my={2}
              />
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

          <Button variant="contained" color="primary" mt={3}>
            Save changes
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MemberInfo;