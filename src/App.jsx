import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  return (
    <>
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
      >
        <ToastContainer />
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </>
  );
};

export default App;
