import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuBar from '../../components/common/MenuBar';
import SearchBar from '../../components/common/SearchBar';
import GroupList from '../../components/groups/GroupList';
import { fetchGroupList } from '../../modules/group';

const GroupListPage = ({ match }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const serachGroup = () => {};
  const { groupList } = useSelector(({ group }) => ({
    groupList: group.list,
  }));
  useEffect(() => {
    dispatch(fetchGroupList());
  }, []);

  return (
    <Grid container alignContent={'center'} spacing={2}>
      <MenuBar match={match} />
      <Grid item xs={12}>
        <SearchBar
          value={searchText}
          onChange={e => {
            const { value } = e.target;
            setSearchText(value);
          }}
          onSubmit={serachGroup}
          placeholder={'단체명을 입력해주세요'}
        />
      </Grid>
      <Grid item xs={12}>
        <GroupList groupList={groupList} />
      </Grid>
    </Grid>
  );
};

export default GroupListPage;
