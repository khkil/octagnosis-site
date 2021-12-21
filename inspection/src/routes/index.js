import React from "react";
import LoginPage from "../pages/auth/LoginPage";
import MainPage from "../pages/common/MainPage";
import StartPage from "../pages/inspections/StartPage";

const mainPageRoute = {
  path: "/",
  title: "메인 페이지",
  auth: true,
  component: MainPage

}

const startPageRoute = {
  path: "/inspections/:inspectionIdx/pages/start",
  title: "시작 페이지",
  auth: true,
  component: StartPage
}

const endPageRoute = {
  path: "/inspections/:inspectionIdx/pages/end",
  title: "시작 페이지",
  auth: true,
  component: StartPage
}

const loginPageRoute = {
  path: "/auth/login",
  title: "시작 페이지",
  component: LoginPage
}
export const commonLayoutRoutes = [
  mainPageRoute,
  startPageRoute
]

export const authLayoutRoutes = [
  loginPageRoute
]
