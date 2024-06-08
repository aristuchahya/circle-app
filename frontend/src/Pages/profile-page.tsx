import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";

import { ProfileCard } from "../Components/Element/Card/profile-card";

import { Suggested } from "../Components/Element/Card/suggest-card";
import { Developed } from "../Components/Element/Card/develope-card";
import { Sidebar } from "../features/home/components/side-bar";

function ProfilePage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <ProfileCard />
        <Divider orientation="vertical" />
        <Spacer />
        <Box maxW="lg">
          <Suggested />
          <Developed />
        </Box>
      </Flex>
    </>
  );
}

export default ProfilePage;
