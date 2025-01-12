import {
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import App from "../ui/App";
import { AnimePage, BookPage, ErrorPage, GenresPage, LikePage, MainPage, RecommendPage, WatchPage, WhatToSeePage } from "pages/index";
import * as Sentry from "@sentry/react";

export const router = createBrowserRouter([
  {
    element: <App><Outlet/></App>,
    errorElement: <App><ErrorPage/></App>,
    children: [
      {
        path: "",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
            <MainPage/>
        </Sentry.ErrorBoundary>,
        children: [
          {
            path: "genres",
            element: <GenresPage/>,
          },
          {
            path: "whatToSee",
            element: <WhatToSeePage/>,
          },
          {
            path: "anime",
            element: <AnimePage/>
          }
        ]
      },
      {
        path: "search",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
            <RecommendPage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "likes",
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
      {
        path: "watch/:anime",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <WatchPage/>
        </Sentry.ErrorBoundary>,
      },
      {
        path: "watch",
        element: <Sentry.ErrorBoundary fallback={<ErrorPage/>}>
          <WatchPage/>
        </Sentry.ErrorBoundary>,
      }
    ]
  },
]);
