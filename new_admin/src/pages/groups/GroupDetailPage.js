import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { groupUpdateApi } from '../../api/groupApi';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';
import GroupCodeManageForm from '../../components/groups/GroupCodeManageForm';
import HorizonalTabs from '../../components/inspections/HorizonalTabs';
import Loader from '../../components/ui/Loader';
import { fetchGroupDetail, FETCH_GROUP_DETAIL } from '../../modules/group';

const tabData = [
  {
    text: '단체 정보',
    value: 'info',
  },
  {
    text: '회차코드 관리',
    value: 'code',
  },
];

const GroupDetailPage = ({ match }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(tabData[1].value);
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
