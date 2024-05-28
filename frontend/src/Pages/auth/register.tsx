import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { FormRegister } from "../../Components/Fragment/form-register";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <>
      <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
        <Box m="auto">
          <Heading color="#04A51E" ms="3" fontSize="4xl">
            circle
          </Heading>
          <Heading color="white" fontSize="xl" ms="3">
            Create account Circle
          </Heading>
          <FormRegister />
          <Text fontSize="14" mt="3">
            Already have account?
            <Link to="/login" style={{ color: "green", marginLeft: "5px" }}>
              Login
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
