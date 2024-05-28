import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Follow } from "../Button/follow";

export function Suggested() {
  return (
    <>
      <Card bg="#262626" m="5">
        <Heading color="white" fontSize="1.25em" m="4" fontWeight="bold">
          Suggested For You
        </Heading>
        <CardBody>
          <Flex direction={"column"} gap="2">
            <HStack>
              <Avatar boxSize="2em" />
              <VStack spacing="0">
                <Text color="white" fontSize="14" ms="3">
                  Ahmad Yahya
                </Text>
                <Text color="grey" fontSize="12" me="6">
                  @ahmad
                </Text>
              </VStack>
              <Spacer />
              <Follow fontSize="14">Follow</Follow>
            </HStack>
            <HStack>
              <Avatar boxSize="2em" />
              <VStack spacing="0">
                <Text color="white" fontSize="14" ms="3">
                  Fajar Satrio
                </Text>
                <Text color="grey" fontSize="12" me="6">
                  @fajar
                </Text>
              </VStack>
              <Spacer />
              <Follow fontSize="14">Follow</Follow>
            </HStack>
            <HStack>
              <Avatar boxSize="2em" />
              <VStack spacing="0">
                <Text color="white" fontSize="14" ms="3">
                  Cahyo Pratama
                </Text>
                <Text color="grey" fontSize="12" me="10">
                  @cahyo
                </Text>
              </VStack>
              <Spacer />
              <Follow fontSize="14">Follow</Follow>
            </HStack>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
