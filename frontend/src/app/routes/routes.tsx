import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import App from "../ui/App";
import { AuthPage, BookPage, ErrorPage, LikePage, RecommendPage } from "pages/index";



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
        element: <AuthPage/>,
      },
      {
        path: "registration",
        element: <AuthPage/>,
      },
      {
        path: "likes",
        element: <LikePage/>,
      },
      {
        path: "book/:title",
        element: <BookPage/>
      },
      {
        path: "books/:category",
        element: <RecommendPage/>,
      },
    ]
  },
]);
