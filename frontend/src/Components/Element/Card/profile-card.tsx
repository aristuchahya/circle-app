import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
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

interface ThreadProps {
  userId: number;
}
export function ProfileCard({ userId }: ThreadProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { threads } = useProfile(userId);

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
          <Text fontSize="12">290</Text>
          <Text color="grey" fontSize="12">
            Following
          </Text>
          <Text fontSize="12">100</Text>
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
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
