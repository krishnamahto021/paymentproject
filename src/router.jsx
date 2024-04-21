import { createBrowserRouter } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Product from "./Pages/Product";

export const router = createBrowserRouter([
  { path: "/", element: <SignUp /> },
  { path: "/product", element: <Product /> },
]);
