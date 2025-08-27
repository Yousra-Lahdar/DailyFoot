import Router from "./routers/Router.tsx";
import {Suspense} from "react";

function App() {


  return (
      <Suspense fallback={<h2>Chargement de la page</h2>}>
      <Router/>
    </Suspense>
  )
}

export default App
