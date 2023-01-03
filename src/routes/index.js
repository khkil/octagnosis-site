import EmailVerifyPage from '../components/auth/EmailVerifyPage';
import FindIdPage from '../pages/auth/FindIdPage';
import FindPasswordPage from '../pages/auth/FindPasswordPage';
import GoogleLoginCallbackPage from '../pages/auth/GoogleLoginCallbackPage';
import KaKaoLoginCallbackPage from '../pages/auth/KaKaoLoginCallbackPage';
import LoginPage from '../pages/auth/LoginPage';
import NaverLoginCallbackPage from '../pages/auth/NaverLoginCallbackPage';
import SignupPage from '../pages/auth/SignupPage';
import MainPage from '../pages/common/MainPage';
import MyPage from '../pages/common/MyPage';
import EndPage from '../pages/inspections/EndPage';
import ProgressPage from '../pages/inspections/ProgressPage';
import ResultPage from '../pages/inspections/ResultPage';
import StartPage from '../pages/inspections/StartPage';

const mainPageRoute = {
  path: '/',
  title: '메인페이지',
  component: MainPage,
};

const myPageRoute = {
  path: '/my-page',
  title: '마이페이지',
  auth: true,
  component: MyPage,
};

const startPageRoute = {
  path: '/inspections/:inspectionIdx/pages/start',
  title: '시작페이지',
  auth: true,
  component: StartPage,
};

const progressPageRoute = {
  path: '/inspections/:inspectionIdx/pages/:page',
  title: '검사 진행',
  auth: true,
  component: ProgressPage,
};

const endPageRoute = {
  path: '/inspections/:inspectionIdx/pages/end',
  title: '검사 완료',
  auth: true,
  component: EndPage,
};

const inspectionResultRoute = {
  path: '/inspections/:inspectionIdx/result',
  title: '검사 결과',
  auth: true,
  component: ResultPage,
};

const loginPageRoute = {
  path: '/auth/login',
  title: '로그인',
  component: LoginPage,
};

const signupPageRoute = {
  path: '/auth/sign-up',
  title: '회원가입',
  component: SignupPage,
};

const emailVerifyPageRoute = {
  path: '/auth/verify-email',
  title: '이메일 인증',
  component: EmailVerifyPage,
};

const KaKaoLoginCallbackPageRoute = {
  path: '/auth/login/kakao',
  title: '카카오 로그인 중',
  component: KaKaoLoginCallbackPage,
};

const NaverLoginCallbackPageRoute = {
  path: '/auth/login/naver',
  title: '네이버 로그인 중',
  component: NaverLoginCallbackPage,
};

const GoogleLoginCallbackPageRoute = {
  path: '/auth/login/google',
  title: '네이버 로그인 중',
  component: GoogleLoginCallbackPage,
};

const FindIdPageRoute = {
  path: '/auth/find-info/id',
  title: '아이디 찾기',
  component: FindIdPage,
};

const FindPasswordRoute = {
  path: '/auth/find-info/password',
  title: '비밀 번호 찾기',
  component: FindPasswordPage,
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
  FindIdPageRoute,
  FindPasswordRoute,
];

export const authLayoutRoutes = [
  emailVerifyPageRoute,
  KaKaoLoginCallbackPageRoute,
  NaverLoginCallbackPageRoute,
  GoogleLoginCallbackPageRoute,
  ,
];
