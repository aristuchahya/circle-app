import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { ThreadEntity } from "../entities/thread";
import { CiHeart } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { useReply } from "../hook/use.reply";
import { Post } from "../../../Components/Element/Button/post";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export interface HomeThreadsProps {
  thread: ThreadEntity;
}
export function HomeThreads({ thread }: HomeThreadsProps) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    handleSubmit,
    onSubmit,
    handleReplyClick,
    isCommenting,
    replies,
    toggleComment,
    showComment,
    replyCount,
  } = useReply({ thread });
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
            onClick={() => {
              handleReplyClick();
              toggleComment();
            }}
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
                  {/* <Text ms="2">{reply.User?.fullName}</Text> */}
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

        {isCommenting && (
          <Box display={"flex"} mt="3">
            <Avatar size={"sm"} src={currentUser.photoProfile} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Enter your reply..."
                {...register("content")}
                variant="outline"
                mb="1"
                border="none"
                width="80%"
              />
              <Post type="submit" fontSize="12" position="relative" left="14em">
                Reply
              </Post>
            </form>
          </Box>
        )}
        <Divider />
      </Box>
    </>
  );
}
