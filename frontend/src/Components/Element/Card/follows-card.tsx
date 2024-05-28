import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Follow } from "../Button/follow";

export function FollowsCard() {
  return (
    <>
      <Box m="5" w="xl">
        <Heading fontSize="xl" mb="5" fontWeight="medium">
          Follows
        </Heading>
        <HStack my="3">
          <Link ms="20">Followers</Link>
          <Spacer />
          <Link me="20">Following</Link>
        </HStack>
        <Flex direction={"column"} gap={"2"} mt="2">
          <HStack>
            <Avatar boxSize="2em" />
            <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
              <Text fontSize="14px">rach</Text>
              <Text fontSize="12px" color="grey">
                @rach
              </Text>
              <Text fontSize="14px">Hello Everybody</Text>
            </VStack>
            <Spacer />
            <Follow fontSize="14">Follow</Follow>
          </HStack>
        </Flex>
        <Flex direction={"column"} gap={"2"} mt="2">
          <HStack>
            <Avatar boxSize="2em" />
            <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
              <Text fontSize="14px">rach</Text>
              <Text fontSize="12px" color="grey">
                @rach
              </Text>
              <Text fontSize="14px">Hello Everybody</Text>
            </VStack>
            <Spacer />
            <Follow fontSize="14">Follow</Follow>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
