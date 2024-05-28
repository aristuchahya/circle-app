import { FormControl, VStack } from "@chakra-ui/react";
import { InputForm } from "../Element/input/input";
import { FormButton } from "../Element/Button/form-button";

export function FormRegister() {
  return (
    <>
      <FormControl isRequired>
        <VStack mt="3">
          <InputForm
            type="text"
            placeholder="Fullname"
            name="fullName"
            width="300px"
          />
          <InputForm
            type="text"
            placeholder="Email"
            name="email"
            width="300px"
          />
          <InputForm
            type="password"
            placeholder="Password"
            name="password"
            width="300px"
          />
          <FormButton>Create</FormButton>
        </VStack>
      </FormControl>
    </>
  );
}
