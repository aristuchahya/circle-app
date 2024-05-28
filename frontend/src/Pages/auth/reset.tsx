import { Box, Flex, FormControl, Heading, VStack } from "@chakra-ui/react";
import { InputForm } from "../../Components/Element/input/input";
import { FormButton } from "../../Components/Element/Button/form-button";

function Reset() {
  return (
    <>
      <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
        <Box m="auto">
          <Heading color="#04A51E" ms="3" fontSize="4xl">
            circle
          </Heading>
          <Heading color="white" fontSize="xl" ms="3">
            Reset Password
          </Heading>

          <FormControl>
            <VStack mt="3">
              <InputForm
                type="password"
                placeholder="New Password"
                name="newPassword"
              />
              <InputForm
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
              />
              <FormButton>Create New Password</FormButton>
            </VStack>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
}

export default Reset;
