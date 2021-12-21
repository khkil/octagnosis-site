import { ThemeProvider } from "@mui/material";
import React from "react";
import Routes from "./routes/Router";



import  "./assets/styles/reset.css";
import  "./assets/styles/fonts.css";
import  "./assets/styles/utility.css";
import  "./assets/styles/common.css";
import  "./assets/styles/style.css";


function App() {
  return (
    <div className="app">
      <Routes/>
    </div>
  );
}

export default App;
