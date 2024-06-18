import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Follow } from "../Button/follow";
import { useFollows } from "../../../features/follows/hook/use-follows";

export interface FollowsCardProps {
  userId: number;
  initialIsFollowing: boolean;
}
export function FollowsCard({ userId, initialIsFollowing }: FollowsCardProps) {
  const { followings, followers } = useFollows({
    userId,
    initialIsFollowing,
  });

  return (
    <>
      <Box m="5" w="xl">
        <Heading fontSize="xl" mb="5" fontWeight="medium">
          Follows
        </Heading>
        <Tabs isFitted variant={"unstyled"}>
          <TabList mb={"1em"}>
            <Tab>Followers</Tab>
            <Tab>Following</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="brand.primary"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Flex direction={"column"} gap={"2"} mt="2">
                {followers &&
                  followers?.map((follower) => (
                    <HStack key={follower.follower.id}>
                      <Avatar
                        boxSize="2em"
                        src={follower.follower.photoProfile}
                      />
                      <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                        <Text fontSize="14px">
                          {follower.follower.fullName}
                        </Text>
                        <Text fontSize="12px" color="grey">
                          @{follower.follower.username}
                        </Text>
                        <Text fontSize="14px">{follower.follower.bio}</Text>
                      </VStack>
                      <Spacer />
                      <Follow
                        userId={follower.follower.id}
                        initialIsFollowing={false}
                      ></Follow>
                    </HStack>
                  ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={"column"} gap={"2"} mt="2">
                {followings &&
                  followings?.map((following) => (
                    <HStack key={following.following.id}>
                      <Avatar
                        boxSize="2em"
                        src={following.following.photoProfile}
                      />
                      <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                        <Text fontSize="14px">
                          {following.following.fullName}
                        </Text>
                        <Text fontSize="12px" color="grey">
                          @{following.following.username}
                        </Text>
                        <Text fontSize="14px">{following.following.bio}</Text>
                      </VStack>
                      <Spacer />
                      <Follow
                        userId={following.following.id}
                        initialIsFollowing={true}
                      ></Follow>
                    </HStack>
                  ))}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
