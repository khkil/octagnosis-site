import React, { useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/ui/Loader';
import MemberInfoForm from '../../components/member/MemberInfoForm';
import MemberProgressList from '../../components/member/MemberProgressList';
import {
  clearMemberProgress,
  fetchMemberProgressList,
  FETCH_MEMBER_PROGRESS_LIST_REQUEST,
} from '../../modules/member';
import { updateMemberRequest } from '../../modules/auth';

const MyPage = () => {
  const dispatch = useDispatch();
  const isSignUpPage = useMemo(
    () => location.pathname.indexOf('/auth/sign-up') > -1,
    [location.state],
  );
  const { member, progressList, isLoading } = useSelector(
    ({ auth, member, loading }) => ({
      member: auth.member,
      progressList: member.progressList,
      isLoading: loading[FETCH_MEMBER_PROGRESS_LIST_REQUEST],
    }),
  );

  const isOauthUser = useMemo(
    () =>
      member.id &&
      (member.id.startsWith('kakao_') || member.id.startsWith('naver_')),
    [],
  );
  const initialValues = useMemo(
    () => ({
      ...member,
      passwordConfirm: member.password,
    }),
    [member],
  );

  const handleSubmit = data => {
    dispatch(updateMemberRequest(data));
  };

  useEffect(() => {
    const { idx } = member;
    dispatch(fetchMemberProgressList());
    return () => {
      dispatch(clearMemberProgress());
    };
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
          isSignUpPage={isSignUpPage}
          isOauthUser={isOauthUser}
          useEmailAuth={false}
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          submitButtonText="정보수정"
        />
      </Card>
      {isLoading || progressList.length === 0 ? (
        <Loader height={50} />
      ) : (
        <MemberProgressList progressList={progressList} />
      )}
    </Container>
  );
};

export default MyPage;
