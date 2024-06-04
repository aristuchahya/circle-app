import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { FormLogin } from "../../Components/Fragment/form-login";
import { Link } from "react-router-dom";
import { LogoCircle } from "../../Components/Element/Heading/logo-circle";

function Login() {
  return (
    <div>
      <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
        <Box m="auto">
          <LogoCircle width={"100px"} ms={"3"} mb={"3"} />
          <Heading color="white" fontSize="26px" ms="3" fontWeight="700">
            Login to Circle
          </Heading>
          <FormLogin />
          <Text fontSize="14" mt="3">
            Don't have an account yet?
            <Link
              to="/register"
              style={{
                color: "green",
                marginLeft: "5px",
              }}
            >
              Create account
            </Link>
          </Text>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
