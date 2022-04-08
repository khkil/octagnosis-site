import MainDashBoard from '../pages/dashboards/MainDashBoard';
import React from 'react';
import LoginPage from '../pages/auth/LoginPage';
import { Person, Subject } from '@mui/icons-material';
import MemberListPage from '../pages/members/MemberListPage';
import MemberDetailPage from '../pages/members/MemberDetailPage';
import InspectionDetailPage from '../pages/inspections/InspectionDetailPage';
import GroupListPage from '../pages/groups/GroupListPage';
import GroupDetailPage from '../pages/groups/GroupDetailPage';
import InspectionStatisticsPage from '../pages/statistics/InspectionStatisticsPage';
import AccessStatisticsPage from '../pages/statistics/AccessStatisticsPage';

const mainDashBoardRoute = {
  path: '/',
  name: '메인 페이지',
  component: MainDashBoard,
};

const authRoute = {
  path: '/auth',
  name: 'auth',
  children: [
    {
      path: '/login',
      name: '로그인 페이지',
      component: LoginPage,
    },
  ],
};

const inspectionRoute = {
  header: '검사 관리',
  name: '검사 목록',
  path: '/manage/inspections',
  icon: <Subject />,
  children: [
    {
      path: '/:inspectionIdx',
      name: '검사 상세',
      component: InspectionDetailPage,
    },
  ],
};

const memberRoute = {
  header: '사용자 관리',
  name: '회원 관리',
  path: '/manage/members',
  icon: <Person />,
  children: [
    {
      path: '',
      name: '회원 목록',
      component: MemberListPage,
    },
    {
      path: '/results',
      name: '검사 결과',
      component: MemberListPage,
    },
    {
      name: '회원 상세',
      path: '/:memberIdx',
      component: MemberDetailPage,
    },
  ],
};

const groupRoute = {
  name: '기관 관리',
  path: '/manage/groups',
  icon: <Subject />,

  children: [
    {
      name: '기관 목록',
      path: '',
      component: GroupListPage,
    },
    {
      name: '기관 상세',
      path: '/:groupIdx',
      component: GroupDetailPage,
    },
  ],
};

const statisticsRoutes = [
  {
    header: '통계',
    name: '검사 통계',
    path: '/statistics/inspection',
    icon: <Subject />,
    component: InspectionStatisticsPage,
  },
  {
    name: '접속 통계',
    path: '/statistics/access',
    icon: <Subject />,
    component: AccessStatisticsPage,
  },
];

export const sidebarRoutes = [inspectionRoute, memberRoute, groupRoute, ...statisticsRoutes];

export const commonLayoutRoutes = [mainDashBoardRoute, ...sidebarRoutes];

export const authLayoutRoutes = [authRoute];
