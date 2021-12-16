import React from "react";
import MainPage from "../pages/MainPage";

const mainPageRoute = {
  path: "/",
  name: "dashboard",
  auth: true,
  header: "",
  component: MainPage

}

export const commonLayoutRoutes = [
  mainPageRoute
]

