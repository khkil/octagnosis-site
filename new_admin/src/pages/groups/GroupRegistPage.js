import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { groupRegistApi } from '../../api/groupApi';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';

const GroupRegistPage = ({ match }) => {
  const registGroup = data => {
    groupRegistApi(data).then(d => {
      console.log(d);
    });
    console.log(data);
  };
  return (
    <Box>
      <MenuBar match={match} />
      <Paper>
        <GroupForm onSubmit={registGroup} />
      </Paper>
    </Box>
  );
};

export default GroupRegistPage;
