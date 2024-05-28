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
import { ThreadProps } from "./card";

export function PostCard({
  name,
  username,
  avatar,
  image,
  post,
  like,
  comment,
}: ThreadProps) {
  return (
    <>
      <Box>
        <Flex mt="3">
          <Avatar size={"sm"} src={avatar}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Text color={"white"} pt={"1"} size="sm" ps="3">
            {name}
          </Text>
          <Text color={"grey"} pt={"1"} ps="2">
            {username}
          </Text>
        </Flex>
        <Text color="white" ms="10" my="3" fontSize="14" textAlign="justify">
          {post}
        </Text>
        <Image src={image} borderRadius="lg" ms="10" />
        <HStack mb="3" ms="10">
          <Icon as={CiHeart} color={"white"} mt="3" ms="4" boxSize={"5"} />
          <Text mt="3" position="relative" right="2" fontSize="12">
            {like}
          </Text>
          <Icon
            as={TfiCommentAlt}
            color={"white"}
            mt="3"
            boxSize={"3"}
            ms="4"
          />
          <Text mt="3" position="relative" right="1" fontSize="12">
            {comment} replies
          </Text>
        </HStack>
        <Divider />
      </Box>
    </>
  );
}
