import MainDashBoard from "../pages/dashboards/MainDashBoard";
import React from "react";
import LoginPage from "../pages/auth/LoginPage";
import { Subject } from "@mui/icons-material";
import QuestionListPage from "../pages/questions/QuestionListPage";
import MemberListPage from "../pages/members/MemberListPage";
import MemberDetailPage from "../pages/members/MemberDetailPage";
import QuestionDetailPage from "../pages/questions/QuestionDetailPage";

const mainDashBoardRoute = {
  path: "/",
  name: "메인 페이지",
  component: MainDashBoard
}

const authRoute = {
  path: "/auth",
  name: "auth",
  children: [
    {
      path: "/login",
      name: "로그인 페이지",
      component: LoginPage,
    },
  ],
};

const questionRoute = {
  header: "검사 관리",
  name: "문항 관리",
  path: "/manage/inspections",
  icon: <Subject/>,
  children: [
    {
      path: "/4",
      name: "사고력검사",
      component: QuestionDetailPage,
    },
  ],
};

const memberListRoute = {
  header: "사용자 관리",
  name: "회원 관리",
  path: "/manage/members",
  icon: <Subject/>,
  component: MemberListPage,
}

const memberDetailRoute = {
  name: "회원 상세",
  path: "/manage/members/:memberIdx",
  icon: <Subject/>,
  component: MemberDetailPage,
}

const groupListRoute = {
  name: "기관 관리",
  path: "/manage/groups",
  icon: <Subject/>,
  component: LoginPage,
}

const groupDetailRoute = {
  name: "기관 상세",
  path: "/manage/groups/:groupIdx",
  icon: <Subject/>,
  component: LoginPage,
}


export const sidebarRoutes = [
  questionRoute,
  memberListRoute,
  groupListRoute
];

export const commonLayoutRoutes = [
  mainDashBoardRoute,
  groupDetailRoute,
  memberDetailRoute,
  ...sidebarRoutes,
];

export const authLayoutRoutes = [authRoute];
