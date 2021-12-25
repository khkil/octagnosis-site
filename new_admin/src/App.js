import React from "react";

import Routes from "./routers/Router";
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <>
      {/* 공통 스타일 속성 관라 */}
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}
export default App;
