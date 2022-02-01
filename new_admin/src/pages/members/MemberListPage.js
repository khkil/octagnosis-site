import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuBar from '../../components/common/MenuBar';
import MemberList from '../../components/members/MemberList';
import { fetchMemberList, FETCH_MEMBER_LIST } from '../../modules/member';
import Loader from '../../components/ui/Loader'

const MemberListPage = ({ match }) => {

  const dispatch = useDispatch();
  const { loading, memberList } = useSelector(({ loading, member }) => ({
    loading: loading[FETCH_MEMBER_LIST],
    memberList: member.list,
    pageInfo: member.pageInfo
  }))
  
  useEffect(() => {
    dispatch(fetchMemberList());
  }, [])
  
  return (
    <div>
      <MenuBar match={match}/>
      {memberList.length === 0 ? 
      <Loader/> : 
      <Paper p={3}>
          <MemberList 
            memberList={memberList}
            pageInfo={pageInfo}
          />
      </Paper>
      }
    </div>
  )
}

export default MemberListPage;
