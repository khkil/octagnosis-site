import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MenuBar from '../../components/common/MenuBar';
import { fetchMemberList } from '../../modules/member';

const MemberListPage = ({ match }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMemberList());
  }, [])
  
  return (
    <div>
      <MenuBar match={match}/>
      <Paper p={3}>
        MemberListPage
      </Paper>
    </div>
  )
}

export default MemberListPage;