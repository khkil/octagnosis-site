import MainDashBoard from "../pages/dashboards/MainDashBoard";
import React from "react";
import LoginPage from "../pages/auth/LoginPage";

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
  path: "/question",
  children: [
    {
      path: "/question/manage",
      name: "옥타그노시스",
      component: LoginPage,
    },
    {
      path: "/question/manage",
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
