import Router from "./routers/Router.tsx";
import {Suspense} from "react";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme.tsx';


function App() {


  return (
      <Suspense fallback={<h2>Chargement de la page</h2>}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router/>
          </ThemeProvider>
    </Suspense>
  )
}

export default App
