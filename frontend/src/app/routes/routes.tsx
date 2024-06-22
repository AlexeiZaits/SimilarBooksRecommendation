import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import App from "../ui/App";
import { ErrorPage } from "pages/ErrorPage/ui/ErrorPage";
import { AuthForm } from "widjets/authForm";
import { RecommendPage } from "pages/RecommendPage/ui/RecommenPage";


export const router = createBrowserRouter([
  { 
    element: <App><Outlet/></App>,
    errorElement: <App><ErrorPage/></App>,
    children: [
      { 
        path: "",
        element: <RecommendPage/>,
      },
      { 
        path: "authorization",
        element: <AuthForm/>,
      },
    ]
  },
]);