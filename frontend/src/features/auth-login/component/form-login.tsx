import { FormControl, FormErrorMessage, Text, VStack } from "@chakra-ui/react";

import { InputForm } from "../../../Components/Element/input/input";
import { FormButton } from "../../../Components/Element/Button/form-button";
import { useLogin } from "../hook/use-login";

export function FormLogin() {
  const { register, handleSubmit, onSubmit, errors } = useLogin();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt="3">
          <FormControl isInvalid={!!errors.usernameOrEmail}>
            <InputForm
              type="text"
              placeholder="Email/Username"
              width="300px"
              {...register("usernameOrEmail")}
            />

            <FormErrorMessage>
              {errors.usernameOrEmail?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputForm
              type="password"
              placeholder="Password"
              width="300px"
              {...register("password")}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Text fontSize="12" ms="18em">
            Forgot Password
          </Text>
          <FormButton
            isDisabled={
              !!(errors.usernameOrEmail?.message || errors.password?.message)
            }
          >
            Login
          </FormButton>
        </VStack>
      </form>
    </div>
  );
}
