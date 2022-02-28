import React from 'react';
import Routes from './routers/Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#27313e',
    },
    error: {
      main: '#ff0000',
    },
    info: {
      main: '#0072e5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
export default App;
