import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import ProfilePage from "./Pages/profile-page";
import SearchPage from "./Pages/search-page";
import FollowsPage from "./Pages/follows-page";
import DetailPage from "./Pages/detail-page";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import { useEffect, useState } from "react";
import Home from "./Pages/home-page";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { api } from "./libs/api";
import { setUser } from "./redux/slices/auth";
import { useToast } from "@chakra-ui/react";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const PrivateRoute = () => {
    if (!isLogin) {
      if (currentUser.email) return <Outlet />;
      return <Navigate to={"/login"} />;
    }
  };

  async function checkLogin() {
    try {
      const token = localStorage.token;
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
      setIsLogin(false);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLogin(false);
      toast({
        title: "User not authenticated!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const token = localStorage.token;
    if (token) checkLogin();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/follows/:id" element={<FollowsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
