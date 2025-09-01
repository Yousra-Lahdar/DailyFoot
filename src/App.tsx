import Router from "./routers/Router.tsx";
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme.tsx';


  const App: React.FC = () => {
    return (
    <>
    <ThemeProvider theme={theme}>
      
      <CssBaseline /> 
      <Router/>

    </ThemeProvider>
    </>
  )
}

export default App
