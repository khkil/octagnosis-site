import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import MenuBar from '../../components/common/MenuBar';
import MemberList from '../../components/members/MemberList';
import { clearMember, fetchMemberList, FETCH_MEMBER_LIST } from '../../modules/member';
import Loader from '../../components/ui/Loader';
import SearchBar from '../../components/common/SearchBar';
import Paging from '../../components/common/Paging';
import { useLocation } from 'react-router-dom';

const MemberListPage = ({ match, history, location }) => {
  const dispatch = useDispatch();

  const query = queryString.parse(location.search);
  const { loading, memberList, pageInfo } = useSelector(({ loading, member }) => ({
    loading: loading[FETCH_MEMBER_LIST] === undefined || Boolean(loading[FETCH_MEMBER_LIST]),
    memberList: member.list,
    pageInfo: member.pageInfo,
  }));

  const [searchText, setSearchText] = useState(query.searchText);

  const searchMember = e => {
    e.preventDefault();
    delete query.pageNum;
    query.searchText = searchText;
    const searchString = queryString.stringify(query);
    const { pathname } = location;
    history.push({
      pathname: pathname,
      search: searchString,
    });
  };

  const goPage = page => {
    query.pageNum = page;
    const searchString = queryString.stringify(query);
    const { pathname } = location;
    history.push({
      pathname: pathname,
      search: searchString,
    });
  };

  useEffect(() => {
    dispatch(fetchMemberList(query));
  }, [location.search]);

  return (
    <Grid container alignContent={'center'} spacing={2}>
      <MenuBar match={match} />
      <Grid item xs={12}>
        <SearchBar
          sx={{ mb: 2 }}
          value={query.searchText}
          onChange={e => {
            const { name, value } = e.target;
            setSearchText(value);
          }}
          onSubmit={searchMember}
          placeholder={'회원명을 입력해주세요'}
        />
      </Grid>
      {/* <Grid xs={12}>{loading ? <Loader /> : <MemberList memberList={memberList} startRow={pageInfo.startRow} />}</Grid> */}
      <Grid item xs={12}>
        <MemberList memberList={memberList} startRow={pageInfo.startRow} />
      </Grid>
      <Grid item xs={12}>
        <Paging pageInfo={pageInfo} page={query.pageNum ? query.pageNum : 1} setPage={goPage} />
      </Grid>
    </Grid>
  );
};

export default MemberListPage;
