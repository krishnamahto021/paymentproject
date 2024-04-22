import { createBrowserRouter } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Product from "./Pages/Product";
import Orders from "./Pages/Orders";

export const router = createBrowserRouter([
  { path: "/", element: <SignUp /> },
  { path: "/product", element: <Product /> },
  { path: "/my-orders", element: <Orders /> },
]);
