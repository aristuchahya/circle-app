import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "../types/use-form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validators/login-form";
import { setUser } from "../../../redux/slices/auth";
import { api } from "../../../libs/api";

export const useLogin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", response.data.token);
      }
      if (user) {
        dispatch(setUser(user));
        toast({
          title: "Login success!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Email / password is wrong!",
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
