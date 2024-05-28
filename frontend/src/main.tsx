import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/home-page.tsx";
import { Login } from "./Pages/auth/login.tsx";
import { Register } from "./Pages/auth/register.tsx";
import Reset from "./Pages/auth/reset.tsx";
import Forgot from "./Pages/auth/forgot.tsx";
import SearchPage from "./Pages/search-page.tsx";
import ProfilePage from "./Pages/profile-page.tsx";
import FollowsPage from "./Pages/follows-page.tsx";
import DetailPage from "./Pages/detail-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },

  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/follows",
    element: <FollowsPage />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
