import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { groupRegistApi } from '../../api/groupApi';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';

const GroupRegistPage = ({ match }) => {
  const history = useHistory();
  const registGroup = group => {
    groupRegistApi(group)
      .then(({ success, data }) => {
        if (Boolean(success)) {
          alert('등록에 성공 하였습니다.');
          const { idx } = data;
          history.push(`/groups/${idx}`);
        } else {
          alert('등록에 실패 하였습니다.');
        }
      })
      .catch(error => {
        alert('server error');
        console.error(error);
      });
    console.log(group);
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
