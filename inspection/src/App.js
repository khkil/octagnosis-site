import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import Routes from './routes/Router';

import './assets/styles/reset.css';
import './assets/styles/utility.css';
import './assets/styles/common.css';
import './assets/styles/style.css';

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
