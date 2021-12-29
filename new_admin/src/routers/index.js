import MainDashBoard from "../pages/dashboards/MainDashBoard";
import React from "react";
import LoginPage from "../pages/auth/LoginPage";
import { Subject } from "@mui/icons-material";

const MainDashBoardRoute = {
  path: "/",
  name: "메인 페이지",
  component: MainDashBoard
}

const authRoute = {
  path: "/auth",
  name: "auth",
  children: [
    {
      path: "/auth/login",
      name: "로그인 페이지",
      component: LoginPage,
    },
  ],
};

const questionRoute = {
  header: "검사 관리",
  name: "문항 관리",
  path: "/manage",
  icon: <Subject/>,
  children: [
    {
      path: "/manage/questions/octagnosis",
      name: "옥타그노시스",
      component: LoginPage,
    },
    {
      path: "/manage/questions/free",
      name: "무료 검사",
      component: LoginPage,
    }
  ],
};


export const sidebarRoutes = [
  questionRoute
];

export const commonLayoutRoutes = [
  MainDashBoardRoute,
  ...sidebarRoutes,
];

export const authLayoutRoutes = [authRoute];
