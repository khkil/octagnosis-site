import { Button, Container, Grid } from '@mui/material';
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
  const query = queryString.parse(location.search);
  const [searchText, setSearchText] = useState(query.searchText);
  const { groupList, pageInfo, loading } = useSelector(({ group, loading }) => ({
    groupList: group.list,
    pageInfo: group.pageInfo,
    loading: loading[FETCH_GROUP_LIST] === undefined || Boolean(loading[FETCH_GROUP_LIST]),
  }));

  const serachGroup = e => {
    e.preventDefault();
    delete query.pageNum;
    query.searchText = searchText;
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(query),
    });
  };

  const goRegistPage = () => {
    history.push('/groups/regist');
  };

  const goPage = page => {
    query.pageNum = page;
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(query),
    });
  };

  useEffect(() => {
    dispatch(fetchGroupList(query));
  }, [location.search]);

  return (
    <Container maxWidth="xl">
      <MenuBar match={match} />
      <Grid container alignContent={'center'} spacing={2}>
        <Grid item xs={10.5}>
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
        <Grid item xs={1.5}>
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
          <Paging pageInfo={pageInfo} page={query.pageNum ? query.pageNum : 1} setPage={goPage} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupListPage;
