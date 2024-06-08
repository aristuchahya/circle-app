import { FormControl, FormErrorMessage, VStack } from "@chakra-ui/react";

import { InputForm } from "../../../Components/Element/input/input";
import { FormButton } from "../../../Components/Element/Button/form-button";
import { useRegister } from "../hook/user-register";

export function FormRegister() {
  const { register, handleSubmit, onSubmit, errors } = useRegister();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt="3">
          <FormControl isInvalid={!!errors.fullName}>
            <InputForm
              type="text"
              placeholder="Fullname"
              {...register("fullName")}
              width="300px"
            />

            <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.username}>
            <InputForm
              type="text"
              placeholder="username"
              {...register("username")}
              width="300px"
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <InputForm
              type="email"
              placeholder="Email"
              {...register("email")}
              width="300px"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputForm
              type="password"
              placeholder="Password"
              {...register("password")}
              width="300px"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormButton
            isDisabled={
              !!errors.fullName?.message ||
              !!errors.username?.message ||
              !!errors.email?.message ||
              !!errors.password?.message
            }
          >
            Create
          </FormButton>
        </VStack>
      </form>
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
