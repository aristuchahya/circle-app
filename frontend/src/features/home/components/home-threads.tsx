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
import { ThreadEntity } from "../entities/thread";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";

interface HomeThreadsProps {
  thread: ThreadEntity;
}
export function HomeThreads({ thread }: HomeThreadsProps) {
  return (
    <>
      <Box m="5" maxW="xl" position={"relative"} bottom="14">
        <Flex mt="3">
          <Avatar size={"md"} src={thread.created.photoProfile}></Avatar>
          <Text color={"white"} pt={"3"} size="sm" ps="3">
            {thread.created.fullName}
          </Text>
          <Text color={"grey"} pt={"3"} ps="2">
            @{thread.created.username}
          </Text>
        </Flex>
        <Text color="white" ms="10" my="3" fontSize="14" textAlign="justify">
          {thread.content}
        </Text>
        <Image src={thread.image} borderRadius="lg" ms="10" width={"md"} />
        <HStack mb="3" ms="5">
          <Icon as={CiHeart} color={"white"} mt="3" ms="4" boxSize={"5"} />
          <Text mt="3" position="relative" right="2" fontSize="12">
            {thread.numberOfLikes}
          </Text>
          <Icon
            as={TfiCommentAlt}
            color={"white"}
            mt="3"
            boxSize={"3"}
            ms="4"
          />
          <Text mt="3" position="relative" right="1" fontSize="12">
            {thread.numberOfReplies} replies
          </Text>
        </HStack>
        <Divider />
      </Box>
    </>
  );
}
