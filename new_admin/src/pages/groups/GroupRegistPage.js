import { Grid } from '@mui/material';
import React from 'react';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';

const GroupRegistPage = ({ match }) => {
  return (
    <Grid container alignContent={'center'} spacing={1}>
      <MenuBar match={match} />
      <Grid item xs={12}>
        <GroupForm />
      </Grid>
      <Grid item xs={12}>
        GroupRegistPage
      </Grid>
      <Grid item xs={12}>
        GroupRegistPage
      </Grid>
    </Grid>
  );
};

export default GroupRegistPage;
