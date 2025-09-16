import Router from "./routers/Router.tsx";
import {RouterProvider} from "react-router";
import {ToastContainer} from "react-toastify";


function App() {


  return (
      <>
      <RouterProvider router={Router}/>
    <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
    />
          </>
  )
}

export default App
