import Router from "./routers/Router.tsx";
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme.tsx';
import HeaderAgent from "./pages/A-header/HeaderAgent.tsx";


  const App: React.FC = () => {
    return (
    <>
    <ThemeProvider theme={theme}>
      
      <CssBaseline /> 
      <Router/>
      <HeaderAgent/>

    </ThemeProvider>
    </>
  )
}

export default App
