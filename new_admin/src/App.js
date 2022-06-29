import React, { useEffect } from 'react';
import Routes from './routers/Router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchInspectionList } from './modules/inspection';

const theme = createTheme({
  typography: {
    //fontFamily: 'serif',
  },
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInspectionList());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
export default App;
