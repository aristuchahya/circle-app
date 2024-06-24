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
import { formatDateNow } from "../../../libs/format-date";
import { useLike } from "../../../features/home/hook/use-like";
import { FaHeart } from "react-icons/fa6";
import { useReply } from "../../../features/home/hook/use.reply";

export interface ThreadUser {
  thread: ThreadEntity;
}
export function PostCard({ thread }: ThreadUser) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteThread } = useThreadsUpdate({ thread });
  const { likes, likeThread } = useLike({ thread });
  const { replyCount, toggleComment, replies, showComment } = useReply({
    thread,
  });

  const handleDelete = async () => {
    console.log("delete");
    await deleteThread();
    onClose();
  };

  const handleLike = async () => {
    likeThread({ threadId: thread.id });
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
          <Text pt="1" ps={"2"}>
            {formatDateNow(thread.createdAt)}
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
          <Icon
            as={likes.isLikedUser ? FaHeart : CiHeart}
            color={"white"}
            mt="3"
            ms="4"
            boxSize={"5"}
            onClick={handleLike}
            cursor={"pointer"}
          />
          <Text mt="3" position="relative" right="2" fontSize="12">
            {likes.likesCount}
          </Text>
          <Icon
            as={TfiCommentAlt}
            color={"white"}
            mt="3"
            boxSize={"3"}
            ms="4"
            onClick={toggleComment}
            cursor={"pointer"}
          />
          <Text mt="3" position="relative" right="1" fontSize="12">
            {replyCount} replies
          </Text>
        </HStack>
        <Divider />
        {showComment && (
          <Box>
            {replies?.map((reply) => (
              <Box ms="6" mb="3" key={reply.id}>
                <Flex>
                  <Avatar size="sm" mt="2" src={reply.User?.photoProfile} />

                  <Text ms="2" color="grey">
                    @{reply.User?.username}
                  </Text>
                </Flex>
                <Text ms="10" position="relative" bottom="2">
                  {reply.content}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}
