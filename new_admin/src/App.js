import React from 'react';
import Routes from './routers/Router';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@mui/material/styles';
import './App.css';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
export default App;
