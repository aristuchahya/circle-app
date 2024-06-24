import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const toast = useToast();

  const logout = () => {
    localStorage.removeItem("token");

    toast({
      title: "Logged out successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/login");
  };
  return logout;
}
