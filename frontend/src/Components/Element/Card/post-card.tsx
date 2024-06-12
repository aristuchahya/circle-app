import {
  Avatar,
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
import { ThreadEntity } from "../../../features/home/entities/thread";

interface ThreadUser {
  thread: ThreadEntity;
}
export function PostCard({ thread }: ThreadUser) {
  return (
    <>
      <Box>
        <Flex mt="3">
          <Avatar size={"sm"} src={thread.created.photoProfile}></Avatar>
          <Text color={"white"} pt={"1"} size="sm" ps="3">
            {thread.created.fullName}
          </Text>
          <Text color={"grey"} pt={"1"} ps="2">
            @{thread.created.username}
          </Text>
        </Flex>
        <Text color="white" ms="10" my="3" fontSize="14" textAlign="justify">
          {thread.content}
        </Text>
        <Image src={thread.image} borderRadius="lg" ms="10" width="md" />
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
