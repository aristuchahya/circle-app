import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiCommentAlt } from "react-icons/tfi";
import { InputForm } from "../input/input";
import { LuImagePlus } from "react-icons/lu";
import { Post } from "../Button/post";
import { ThreadProps } from "./card";
import { useEffect, useState } from "react";
import { PostCard } from "./post-card";

export function DetailCard() {
  const [users, setUsers] = useState<ThreadProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/data.json");
      const data: ThreadProps[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Box maxW="2xl" m="5" ms="6">
        <Heading fontSize="2xl">
          <Icon as={FaArrowLeftLong} pt="2" /> Status
        </Heading>
        <Flex mt="2">
          <Avatar
            size={"sm"}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <VStack spacing={"0"}>
            <Text color={"white"} ps="3">
              Nimas
            </Text>
            <Text color={"grey"} ps="3" fontSize="14">
              @nimas
            </Text>
          </VStack>
        </Flex>
        <Text color="white" mt="2" fontSize="14" textAlign="justify">
          lorem ipsum dasdadw habshbahx habxhbasxbsa habxhabhj hbashahsb abs
        </Text>
        <HStack spacing="2">
          <Text color="grey" fontSize="12">
            11.00 AM
          </Text>
          <Text color="grey" fontSize="12">
            Jul 26, 2023
          </Text>
        </HStack>
        <HStack mb="3">
          <Icon as={CiHeart} color={"white"} mt="3" boxSize={"5"} />
          <Text mt="3" position="relative" right="2" fontSize="12">
            100
          </Text>
          <Icon
            as={TfiCommentAlt}
            color={"white"}
            mt="3"
            boxSize={"3"}
            ms="4"
          />
          <Text mt="3" position="relative" right="1" fontSize="12">
            30 replies
          </Text>
        </HStack>
        <Divider />
        <HStack my="3">
          <Avatar
            size={"sm"}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <InputForm
            type="text"
            name="comment"
            placeholder="Type your reply"
            width="full"
            border="none"
          />
          <Spacer />
          <Icon color={"green"} me="1" boxSize="5" as={LuImagePlus} />
          <Post fs="12">Reply</Post>
        </HStack>
        <Divider />
        {users.map((user) => (
          <PostCard
            key={user.id}
            name={user.name}
            username={user.username}
            avatar={user.avatar}
            image={user.image}
            post={user.post}
            like={user.like}
            comment={user.comment}
          />
        ))}
      </Box>
    </>
  );
}

// {name, username, avatar, image, post, like, comment}: ThreadProps
