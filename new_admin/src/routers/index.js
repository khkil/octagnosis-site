import MainDashBoard from '../pages/dashboards/MainDashBoard';
import React from 'react';
import LoginPage from '../pages/auth/LoginPage';
import { Subject } from '@mui/icons-material';
import QuestionListPage from '../pages/inspections/QuestionListPage';
import MemberListPage from '../pages/members/MemberListPage';
import MemberDetailPage from '../pages/members/MemberDetailPage';
import InspectionDetailPage from '../pages/inspections/InspectionDetailPage';

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
  icon: <Subject />,
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
      icon: <Subject />,
      component: MemberDetailPage,
    },
  ],
};

const groupListRoute = {
  name: '기관 관리',
  path: '/manage/groups',
  icon: <Subject />,
  component: LoginPage,
};

const groupDetailRoute = {
  name: '기관 상세',
  path: '/manage/groups/:groupIdx',
  icon: <Subject />,
  component: LoginPage,
};

export const sidebarRoutes = [inspectionRoute, memberRoute, groupListRoute];

export const commonLayoutRoutes = [mainDashBoardRoute, ...sidebarRoutes, groupDetailRoute];

export const authLayoutRoutes = [authRoute];
