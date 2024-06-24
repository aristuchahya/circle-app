import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { PostCard } from "./post-card";

import { HeadProfile } from "../Heading/head-profile";
import { EditProfile } from "../Button/edit";
import { EditModal } from "../Modal/edit-modal";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useProfile } from "../../../features/profile/hook/use-profile";
import { useFollows } from "../../../features/follows/hook/use-follows";
import { useEffect, useState } from "react";
import { useTotalLike } from "../../../features/home/hook/use-total";

export interface ThreadProps {
  userId: number;
}
export function ProfileCard({ userId }: ThreadProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [followingCount, setFollowingCount] = useState(0);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { threads } = useProfile(userId);
  const { totalLike } = useTotalLike(userId);

  const { followings } = useFollows({ userId, initialIsFollowing: false });
  useEffect(() => {
    if (followings) {
      setFollowingCount(followings.length);
    }
  }, [followings]);

  return (
    <>
      <Box maxW="2xl" m="5" ms="6">
        <Heading fontSize="2xl">
          <Icon as={FaArrowLeftLong} pt="2" /> {currentUser.fullName}
        </Heading>
        <Box>
          <HeadProfile />
          <Flex justify={"end"} position={"relative"} bottom="10">
            <EditProfile fontSize="12" px="12" py="3" onClick={onOpen} />
          </Flex>
          <EditModal isOpen={isOpen} onClose={onClose} />
        </Box>

        <Heading fontSize="xl">{currentUser.fullName}</Heading>
        <Text color="grey" fontSize="14" mb="2">
          @{currentUser.username}
        </Text>
        <Text fontSize="14" fontWeight="medium">
          {currentUser.bio}
        </Text>
        <HStack spacing={"2"}>
          <Text fontSize="12">{followingCount}</Text>
          <Text color="grey" fontSize="12">
            Following
          </Text>
          <Text fontSize="12">{totalLike}</Text>
          <Text color="grey" fontSize="12">
            Likes
          </Text>
        </HStack>

        <Tabs isFitted variant={"unstyled"}>
          <TabList>
            <Tab>All Post</Tab>
            <Tab>Media</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="brand.primary"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              {threads?.map((thread) => (
                <PostCard key={thread.id} thread={thread} />
              ))}
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3} gap={2}>
                {threads?.map((thread) => (
                  <Image key={thread.id} src={thread.image} boxSize={"100%"} />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
