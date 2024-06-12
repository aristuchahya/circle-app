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

export function FollowsCard() {
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
                <HStack>
                  <Avatar boxSize="2em" />
                  <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                    <Text fontSize="14px">rach</Text>
                    <Text fontSize="12px" color="grey">
                      @rach
                    </Text>
                    <Text fontSize="14px">Hello Everybody</Text>
                  </VStack>
                  <Spacer />
                  <Follow fontSize="14">Follow</Follow>
                </HStack>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={"column"} gap={"2"} mt="2">
                <HStack>
                  <Avatar boxSize="2em" />
                  <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                    <Text fontSize="14px">aris</Text>
                    <Text fontSize="12px" color="grey">
                      @rist
                    </Text>
                    <Text fontSize="14px">Hello Everybody</Text>
                  </VStack>
                  <Spacer />
                  <Follow fontSize="14">Follow</Follow>
                </HStack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
