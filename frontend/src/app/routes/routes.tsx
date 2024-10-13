import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import App from "../ui/App";
import { AuthPage, BookPage, ErrorPage, LikePage, RecommendPage } from "pages/index";
import * as Sentry from "@sentry/react";

export const router = createBrowserRouter([
  {
    element: <App><Outlet/></App>,
    errorElement: <App><ErrorPage/></App>,
    children: [
      {
        path: "",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
            <RecommendPage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "authorization",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <AuthPage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "registration",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <AuthPage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "favorites",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <LikePage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "book/:title",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
        <BookPage/>
      </Sentry.ErrorBoundary>,
      },
      {
        path: "books/:category",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <RecommendPage/>
        </Sentry.ErrorBoundary>,
      },
    ]
  },
]);
