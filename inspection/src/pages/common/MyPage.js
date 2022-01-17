import React, { useEffect, useMemo } from 'react';
import { Container, Box, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/ui/Loader';
import MemberInfoForm from '../../components/member/MemberInfoForm';
import MemberProgressList from '../../components/member/MemberProgressList';
import { clearMemberProgress, fetchMemberProgressList, FETCH_MEMBER_PROGRESS_LIST_REQUEST } from '../../modules/member';

const MyPage = () => {

  const dispatch = useDispatch();
  const { member, progressList, isLoading } = useSelector(({ auth, member, loading }) => ({
    member: auth.member,
    progressList: member.progressList,
    isLoading: loading[FETCH_MEMBER_PROGRESS_LIST_REQUEST]
  }));

  const isOauthUser = useMemo(() => member.id.startsWith("kakao_"), []);
  const initialValues = useMemo(() => ({
    ...member,
    password_confirm: member.password
  }), [member]);

  const handleSubmit = (data) => {
    console.log(data);
  }
  
  useEffect(() => {
    const { idx } = member;
    dispatch(fetchMemberProgressList(idx));
    return () => {
      dispatch(clearMemberProgress());
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          padding: 3,
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MemberInfoForm
          isOauthUser={isOauthUser}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          submitButtonText="정보수정"
        />
      </Card>
      {(isLoading || progressList.length === 0) ? 
        (<Loader height={50}/>) : 
        (<MemberProgressList progressList={progressList}/>)
      }
    </Container>
  )
}

export default MyPage;