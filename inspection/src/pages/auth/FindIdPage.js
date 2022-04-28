import { Box, Container, Grid, Paper, TextField } from '@mui/material';
import React from 'react';

const FindIdPage = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          sx={{
            width: '50%',
            height: 400,
            mt: '20%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <TextField fullWidth></TextField>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default FindIdPage;
