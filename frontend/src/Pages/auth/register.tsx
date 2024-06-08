import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { LogoCircle } from "../../Components/Element/Heading/logo-circle";
import { FormRegister } from "../../features/auth-register/components/form-register";

function Register() {
  return (
    <>
      <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
        <Box m="auto">
          <LogoCircle width={"100px"} ms={"3"} mb={"3"} />
          <Heading color="white" fontSize="2xl" ms="3">
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

export default Register;
