import { VStack } from "@chakra-ui/react";
import { InputForm } from "../Element/input/input";
import { FormButton } from "../Element/Button/form-button";

import { api } from "../../libs/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
}
export function FormRegister() {
  const [form, setForm] = useState<FormValues>({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [name]: value });
    // console.log(`Field ${name} changed to ${value}`);
  }

  async function handleSubmit() {
    // event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await api.post("/auth/register", formData);
      console.log("Response successful:", response);
      navigate("/login");
    } catch (error) {
      console.error("Error successful:", error);
    }
  }

  return (
    <>
      <VStack mt="3">
        <InputForm
          type="text"
          placeholder="Fullname"
          id="fullName"
          name="fullName"
          onChange={handleChange}
          width="300px"
        />

        <InputForm
          type="text"
          placeholder="username"
          id="username"
          name="username"
          onChange={handleChange}
          width="300px"
        />

        <InputForm
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={handleChange}
          width="300px"
        />

        <InputForm
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleChange}
          width="300px"
        />

        <FormButton onClick={handleSubmit}>Create</FormButton>
      </VStack>
    </>
  );
}

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
//   control,
// } = useForm<FormValues>();
// const onSubmit = async (data: FormValues) => {
//   try {
//     console.log("Submitting form with data:", data);
//     const response = await api.post("/auth/register", data);
//     console.log("Response successful:", response.data);
//   } catch (error) {
//     console.error("Error successful:", error);
//   }
// };
