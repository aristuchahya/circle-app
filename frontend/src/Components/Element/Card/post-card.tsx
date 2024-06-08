import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";

export function PostCard() {
  return (
    <>
      <Box>
        <Flex mt="3">
          <Avatar size={"sm"} src="">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text color={"white"} pt={"1"} size="sm" ps="3">
            aristu
          </Text>
          <Text color={"grey"} pt={"1"} ps="2">
            @arist
          </Text>
        </Flex>
        <Text color="white" ms="10" my="3" fontSize="14" textAlign="justify">
          content
        </Text>
        <Image src="" borderRadius="lg" ms="10" />
        <HStack mb="3" ms="10">
          <Icon as={CiHeart} color={"white"} mt="3" ms="4" boxSize={"5"} />
          <Text mt="3" position="relative" right="2" fontSize="12">
            30
          </Text>
          <Icon
            as={TfiCommentAlt}
            color={"white"}
            mt="3"
            boxSize={"3"}
            ms="4"
          />
          <Text mt="3" position="relative" right="1" fontSize="12">
            100 replies
          </Text>
        </HStack>
        <Divider />
      </Box>
    </>
  );
}
