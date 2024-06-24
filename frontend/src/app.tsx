import { Navigate, Route, Routes } from "react-router-dom";

import ProfilePage from "./Pages/profile-page";
import SearchPage from "./Pages/search-page";
import FollowsPage from "./Pages/follows-page";
import DetailPage from "./Pages/detail-page";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";

import Home from "./Pages/home-page";
import { useDispatch } from "react-redux";

import { api } from "./libs/api";
import { setUser } from "./redux/slices/auth";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { data: authUser, isPending } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const token = localStorage.token;
      if (token) {
        try {
          const response = await api.post(
            "/auth/check",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(setUser(response.data));
          return response.data;
        } catch (error) {
          localStorage.removeItem("token");
          toast({
            title: "User not authenticated!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
  });

  if (isPending)
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={"/"} replace />}
        />

        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="/profile/:userId"
          element={
            authUser ? <ProfilePage /> : <Navigate to={"/login"} replace />
          }
        />
        <Route
          path="/search"
          element={
            authUser ? <SearchPage /> : <Navigate to={"/login"} replace />
          }
        />
        <Route path="/detail" element={<DetailPage />} />
        <Route
          path="/follows/:id"
          element={
            authUser ? <FollowsPage /> : <Navigate to={"/login"} replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
