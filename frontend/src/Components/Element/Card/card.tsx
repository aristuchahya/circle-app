import {
  Text,
  Image,
  Divider,
  Flex,
  Avatar,
  AvatarBadge,
  Icon,
  Box,
  Heading,
  Spacer,
  Input,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import { TfiCommentAlt } from "react-icons/tfi";
import { Post } from "../Button/post";
import { PostModal } from "../Modal/post-modal";

export interface ThreadProps {
  id?: number;
  name: string;
  username: string;
  avatar: string;
  image?: string;
  post?: string;
  like: number;
  comment: number;
}

export function Head() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box m={"5"}>
        <Heading fontSize="xl" mb="5" fontWeight="medium">
          Home
        </Heading>
        <Flex>
          <Avatar size={"sm"} mb="2">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Input
            placeholder=" What is happening?!.."
            size="sm"
            border="none"
          ></Input>
          <Spacer />
          <Icon color={"green"} mt="2" me="1" boxSize="5" as={LuImagePlus} />
          <Post mt="2" fs="12" onclick={onOpen}>
            Post
          </Post>
        </Flex>
        <Divider />
        <PostModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}
export function ThreadCard({
  name,
  username,
  image,
  post,
  avatar,
  like,
  comment,
}: ThreadProps) {
  return (
    <div>
      <Box m="5" mt="2" maxW="xl">
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
        <HStack mb="3" ms="5">
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
    </div>
  );
}
