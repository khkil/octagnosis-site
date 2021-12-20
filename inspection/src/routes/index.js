import React from "react";
import MainPage from "../pages/common/MainPage";
import startPage from "../pages/inspections/StartPage";

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
  component: startPage
}

const endPageRoute = {
  path: "/inspections/:inspectionIdx/pages/end",
  title: "시작 페이지",
  auth: true,
  component: startPage
}

export const commonLayoutRoutes = [
  mainPageRoute,
  startPageRoute
]

