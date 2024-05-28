import { Box, Divider, Flex, Spacer } from "@chakra-ui/react";
import { Sidebar } from "../Components/Sidebar/side-bar";
import { ProfileCard } from "../Components/Element/Card/profile-card";

import { Suggested } from "../Components/Element/Card/suggest-card";
import { Developed } from "../Components/Element/Card/develope-card";

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
