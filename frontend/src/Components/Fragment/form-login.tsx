import { FormControl, Text, VStack } from "@chakra-ui/react";
import { InputForm } from "../Element/input/input";
import { FormButton } from "../Element/Button/form-button";

export function FormLogin() {
  return (
    <>
      <FormControl isRequired>
        <VStack mt="3">
          <InputForm
            type="text"
            placeholder="Email/Username"
            name="email"
            width="300px"
          />
          <InputForm
            type="password"
            placeholder="Password"
            name="password"
            width="300px"
          />
          <Text fontSize="12" ms="18em">
            Forgot Password
          </Text>
          <FormButton>Login</FormButton>
        </VStack>
      </FormControl>
    </>
  );
}
