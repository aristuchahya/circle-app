import { Card, CardBody, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Developed() {
  return (
    <>
      <Card bg="#262626" mt="3" m="5">
        <CardBody>
          <HStack spacing="3">
            <Text color="white" fontWeight="medium" fontSize="14">
              Developed By Aristu
            </Text>
            <Spacer />
            <Icon color="grey" as={FaGithub} />
            <Icon color="grey" as={FaLinkedin} />
            <Icon color="grey" as={FaInstagram} />
            <Icon color="grey" as={FaFacebook} />
          </HStack>
          <Text color="grey" fontSize={"12"}>
            Powered by Dumbways Indonesia Coding Bootcamp #1 Indonesia
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
