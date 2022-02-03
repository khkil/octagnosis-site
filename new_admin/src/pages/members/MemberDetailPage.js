import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MenuBar from '../../components/common/MenuBar'
const MemberDetailPage = ({ match }) => {

  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  return (
    <Box>
      <MenuBar match={match} />
      MemberDetailPage
    </Box>
  )
}

export default MemberDetailPage;