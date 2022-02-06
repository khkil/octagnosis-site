import React from 'react';
import GoogleLoginCallback from '../components/auth/GoogleLoginCallback';
import KaKaoLoginCallback from '../components/auth/KaKaoLoginCallback';
import NaverLoginCallback from '../components/auth/NaverLoginCallback';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import MainPage from '../pages/common/MainPage';
import MyPage from '../pages/common/MyPage';
import EndPage from '../pages/inspections/EndPage';
import ProgressPage from '../pages/inspections/ProgressPage';
import ResultPage from '../pages/inspections/ResultPage';
import StartPage from '../pages/inspections/StartPage';

const mainPageRoute = {
  path: '/',
  title: '메인 페이지',
  component: MainPage,
};

const myPageRoute = {
  path: '/my-page',
  title: '마이 페이지',
  auth: true,
  component: MyPage,
};

const startPageRoute = {
  path: '/inspections/:inspectionIdx/pages/start',
  title: '시작 페이지',
  auth: true,
  component: StartPage,
};

const progressPageRoute = {
  path: '/inspections/:inspectionIdx/pages/:page',
  title: '진행 페이지',
  auth: true,
  component: ProgressPage,
};

const endPageRoute = {
  path: '/inspections/:inspectionIdx/pages/end',
  title: '끝 페이지',
  auth: true,
  component: EndPage,
};

const loginPageRoute = {
  path: '/auth/login',
  title: '로그인 페이지',
  component: LoginPage,
};

const signupPageRoute = {
  path: '/auth/sign-up',
  title: '회원가입 페이지',
  component: SignupPage,
};

const kakaoLoginCallbackRoute = {
  path: '/auth/login/kakao',
  title: '카카오 로그인 중',
  component: KaKaoLoginCallback,
};

const naverLoginCallbackRoute = {
  path: '/auth/login/naver',
  title: '네이버 로그인 중',
  component: NaverLoginCallback,
};

const googleLoginCallbackRoute = {
  path: '/auth/login/google',
  title: '네이버 로그인 중',
  component: GoogleLoginCallback,
};

const inspectionResultRoute = {
  path: '/inspections/:inspectionIdx/result',
  title: '결과 페이지',
  auth: true,
  component: ResultPage,
};

export const commonLayoutRoutes = [
  mainPageRoute,
  loginPageRoute,
  signupPageRoute,
  myPageRoute,
  startPageRoute,
  endPageRoute,
  progressPageRoute,
  inspectionResultRoute,
];

export const authLayoutRoutes = [
  kakaoLoginCallbackRoute,
  naverLoginCallbackRoute,
  googleLoginCallbackRoute,
  ,
];
