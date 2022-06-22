import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupUpdateApi } from '../../api/groupApi';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';
import Loader from '../../components/ui/Loader';
import { fetchGroupDetail, FETCH_GROUP_DETAIL } from '../../modules/group';

const GroupDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, groupDetail } = useSelector(({ loading, group }) => ({
    loading: loading[FETCH_GROUP_DETAIL] === undefined || Boolean(loading[FETCH_GROUP_DETAIL]),
    groupDetail: group.selected,
  }));
  const updateGroup = group => {
    const { groupIdx } = match.params;
    groupUpdateApi(groupIdx, group)
      .then(({ data, success }) => {
        if (Boolean(success)) {
          alert('수정에 성공하였습니다.');
          history.push('/groups');
        } else {
          alert('수정에 실패하였습니다.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('server error');
      });
  };

  useEffect(() => {
    const { groupIdx } = match.params;
    dispatch(fetchGroupDetail(groupIdx));
  }, []);

  return (
    <Container maxWidth={'xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MenuBar match={match} thirdText={groupDetail.name} />
          <Paper>
            <Box p={2}>
              <Typography variant="h5">{groupDetail.name}</Typography>
            </Box>
            <GroupForm initialValues={groupDetail} onSubmit={updateGroup} />
          </Paper>
        </>
      )}
    </Container>
  );
};

export default GroupDetailPage;
