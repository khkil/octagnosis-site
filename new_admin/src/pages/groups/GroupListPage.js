import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import MenuBar from '../../components/common/MenuBar';
import SearchBar from '../../components/common/SearchBar';
import GroupList from '../../components/groups/GroupList';
import Loader from '../../components/ui/Loader';
import { fetchGroupList, FETCH_GROUP_LIST } from '../../modules/group';
import Paging from '../../components/common/Paging';
import { useHistory } from 'react-router-dom';
import { Add, PlusOne } from '@mui/icons-material';

const GroupListPage = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [params, setParams] = useState(queryString.parse(location.search));
  const { groupList, pageInfo, loading } = useSelector(({ group, loading }) => ({
    groupList: group.list,
    pageInfo: group.pageInfo,
    loading: loading[FETCH_GROUP_LIST] === undefined || Boolean(loading[FETCH_GROUP_LIST]),
  }));

  const serachGroup = () => {};

  const goRegistPage = () => {
    history.push('/groups/regist');
  };
  const goPage = page => {
    setParams({ ...params, pageNum: page });
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });
  };
  useEffect(() => {
    dispatch(fetchGroupList(params));
  }, [location.search]);

  return (
    <Grid container alignContent={'center'} spacing={2}>
      <MenuBar match={match} />
      <Grid item xs={12}>
        <SearchBar
          value={params.searchText}
          onChange={e => {
            const { value } = e.target;
            setSearchText(value);
          }}
          onSubmit={serachGroup}
          placeholder={'단체명을 입력해주세요'}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ mb: 3 }}
          color="primary"
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={goRegistPage}
        >
          단체 등록
        </Button>
      </Grid>
      <Grid item xs={12}>
        <GroupList groupList={groupList} startRow={pageInfo.startRow} />
      </Grid>
      <Grid item xs={12}>
        <Paging pageInfo={pageInfo} page={params.pageNum ? params.pageNum : 1} setPage={goPage} />
      </Grid>
    </Grid>
  );
};

export default GroupListPage;
