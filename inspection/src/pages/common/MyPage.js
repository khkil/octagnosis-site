import React, { useEffect } from 'react';
import { Container, Box, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/ui/Loader';
import MemberInfo from '../../components/member/MemberInfo';
import MemberProgressList from '../../components/member/MemberProgressList';
import { fetchMemberProgressList } from '../../modules/member';

const MyPage = () => {

  const dispatch = useDispatch();
  const { memberIdx } = useSelector(({ auth }) => ({
    memberIdx: auth.member
  }));
  console.log(memberIdx);
  useEffect(() => {
    
    //dispatch(fetchMemberProgressList(memberIdx));
  }, []);

  return (
    <Container maxWidth="xl">
      <MemberProgressList/>
      <MemberInfo/>
    </Container>
  )
}

export default MyPage;