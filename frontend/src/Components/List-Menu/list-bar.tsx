import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { FaHeart, FaUser } from "react-icons/fa";
import { TbUserSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

export function ListBar() {
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
          fontWeight={isActive("/follows") ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={FaHeart}
            stroke="white"
            strokeWidth="20"
            fill={isActive("/follows") ? "white" : "none"}
          />
          <Link to="/follows">Follows</Link>
        </ListItem>
        <ListItem
          mt="4"
          fontSize="large"
          fontWeight={isActive("/profile") ? "bold" : ""}
          _hover={{ textDecoration: "none", color: "gray.300" }}
        >
          <ListIcon
            as={FaUser}
            stroke="white"
            strokeWidth="30"
            fill={isActive("/profile") ? "white" : "none"}
          />
          <Link to="/profile">Profile</Link>
        </ListItem>
      </List>
    </>
  );
}

// _hover={{ textDecoration: "none", color: "gray.300" }}
