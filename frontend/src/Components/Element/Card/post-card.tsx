import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { Pencil, Trash2 } from "lucide-react";
import { ThreadEntity } from "../../../features/home/entities/thread";
import { ThreadModal } from "../Modal/thread-modal";
import { useThreadsUpdate } from "../../../features/profile/hook/threads-update";

export interface ThreadUser {
  thread: ThreadEntity;
}
export function PostCard({ thread }: ThreadUser) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteThread } = useThreadsUpdate({ thread });

  const handleDelete = async () => {
    await deleteThread();
    onClose();
  };

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
          <Spacer />
          <Box display={"flex"} flexDirection={"column"} gap="2">
            <Pencil onClick={onOpen} cursor={"pointer"} size="20" />
            <Trash2 size="20" onClick={handleDelete} cursor={"pointer"} />
          </Box>
          <ThreadModal isOpen={isOpen} onClose={onClose} thread={thread} />
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
