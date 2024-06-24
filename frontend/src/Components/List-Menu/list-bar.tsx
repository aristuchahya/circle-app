import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { FaHeart, FaUser } from "react-icons/fa";
import { TbUserSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../libs/api";
import { useQuery } from "@tanstack/react-query";

const getUserData = async () => {
  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  return response.data;
};

export function ListBar() {
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      <List mt="8" ms="3">
        <ListItem
          mt="4"
          fontSize="large"
          fontWeight={isActive("/") ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={AiFillHome}
            stroke="white"
            strokeWidth="50"
            fill={isActive("/") ? "white" : "none"}
          />
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem
          mt="4"
          fontSize="large"
          fontWeight={isActive("/search") ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={TbUserSearch}
            stroke="white"
            strokeWidth="2"
            fill={isActive("/search") ? "white" : "none"}
          />
          <Link to="/search">Search</Link>
        </ListItem>
        <ListItem
          mt="4"
          fontSize="large"
          fontWeight={isActive(`/follows/${userData?.id}`) ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={FaHeart}
            stroke="white"
            strokeWidth="20"
            fill={isActive(`/follows/${userData?.id}`) ? "white" : "none"}
          />
          <Link to={`/follows/${userData?.id}`}>Follows </Link>
        </ListItem>
        <ListItem
          mt="4"
          fontSize="large"
          fontWeight={isActive(`/profile/${userData?.id}`) ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={FaUser}
            stroke="white"
            strokeWidth="30"
            fill={isActive(`/profile/${userData?.id}`) ? "white" : "none"}
          />
          <Link to={`/profile/${userData?.id}`}>Profile</Link>
        </ListItem>
      </List>
    </>
  );
}

// _hover={{ textDecoration: "none", color: "gray.300" }}
