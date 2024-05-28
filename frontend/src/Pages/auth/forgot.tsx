import {
  Box,
  Flex,
  FormControl,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputForm } from "../../Components/Element/input/input";
import { FormButton } from "../../Components/Element/Button/form-button";

function Forgot() {
  return (
    <>
      <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
        <Box m="auto">
          <Heading color="#04A51E" ms="3" fontSize="4xl">
            circle
          </Heading>
          <Heading color="white" fontSize="xl" ms="3">
            Forgot Password
          </Heading>

          <FormControl>
            <VStack mt="3">
              <InputForm type="text" placeholder="Email" name="email" />

              <FormButton>Send Instruction</FormButton>
            </VStack>
          </FormControl>
          <Text fontSize="14" mt="3">
            Already have account?
            <Link href="/login" color="green" ms="2">
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}

export default Forgot;
