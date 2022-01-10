import React, { useEffect } from 'react';
import { Container, Box, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/ui/Loader';
import MemberInfo from '../../components/member/MemberInfo';
import MemberProgressList from '../../components/member/MemberProgressList';
import { clearMemberProgress, fetchMemberProgressList, FETCH_MEMBER_PROGRESS_LIST_REQUEST } from '../../modules/member';

const MyPage = () => {

  const dispatch = useDispatch();
  const { member, progressList, isLoading } = useSelector(({ auth, member, loading }) => ({
    member: auth.member,
    progressList: member.progressList,
    isLoading: loading[FETCH_MEMBER_PROGRESS_LIST_REQUEST]
  }));
  
  useEffect(() => {
    const { idx } = member;
    dispatch(fetchMemberProgressList(idx));
    return () => {
      dispatch(clearMemberProgress());
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <MemberInfo 
        id={member.id}
        name={member.name}
      />
      {(isLoading || progressList.length === 0) ? 
        (<Loader height={50}/>) : 
        (<MemberProgressList progressList={progressList}/>)
      }
    </Container>
  )
}

export default MyPage;