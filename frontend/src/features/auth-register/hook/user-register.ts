import { useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../types/user-register-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validator/user-register";
import { api } from "../../../libs/api";
import { setUser } from "../../../redux/slices/auth";

export const useRegister = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log("Register succesfull:", response);

      const user = response.data.user;

      if (user) {
        dispatch(setUser(user));
        toast({
          title: "Register success!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast({
        title: "Register failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
