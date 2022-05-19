import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { groupUpdateApi } from '../../api/groupApi';
import MenuBar from '../../components/common/MenuBar';
import GroupForm from '../../components/groups/GroupForm';
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
  const [tabValue, setTabValue] = useState(tabData[0].value);
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
  console.log(loading, groupDetail);
  return (
    <Box>
      <MenuBar match={match} />
      {loading ? (
        <Loader />
      ) : (
        <Paper>
          <HorizonalTabs tabData={tabData} tabValue={tabValue} setTabValue={setTabValue} />
          {tabValue === 'info' ? (
            <GroupForm initialValues={groupDetail} onSubmit={updateGroup} />
          ) : tabValue === 'code' ? (
            <div>code</div>
          ) : null}
        </Paper>
      )}
    </Box>
  );
};

export default GroupDetailPage;
