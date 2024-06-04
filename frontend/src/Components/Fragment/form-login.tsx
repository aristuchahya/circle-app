import { FormControl, Text, VStack } from "@chakra-ui/react";
import { InputForm } from "../Element/input/input";
import { FormButton } from "../Element/Button/form-button";
import React, { useState } from "react";
import { api } from "../../libs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/auth";

type LoginForm = {
  usernameOrEmail: string;

  password: string;
};
export function FormLogin() {
  const [form, setForm] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit() {
    try {
      // const formData = new FormData();

      // formData.append("usernameOrEmail", form.usernameOrEmail);

      // formData.append("password", form.password);

      const response = await api.post("/auth/login", form);

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        dispatch(setUser(user));
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <FormControl>
        <VStack mt="3">
          <InputForm
            type="text"
            placeholder="Email/Username"
            name="usernameOrEmail"
            width="300px"
            onChange={handleChange}
          />
          <InputForm
            type="password"
            placeholder="Password"
            name="password"
            width="300px"
            onChange={handleChange}
          />
          <Text fontSize="12" ms="18em">
            Forgot Password
          </Text>
          <FormButton onClick={handleSubmit}>Login</FormButton>
        </VStack>
      </FormControl>
    </>
  );
}
