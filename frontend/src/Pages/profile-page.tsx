import { Box, Divider, Spacer } from "@chakra-ui/react";

import { ProfileCard } from "../Components/Element/Card/profile-card";

import { Suggested } from "../Components/Element/Card/suggest-card";
import { Developed } from "../Components/Element/Card/develope-card";
import { Sidebar } from "../features/home/components/side-bar";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <Box display={"flex"} height={"100vh"}>
        <Sidebar />
        <Divider orientation="vertical" display={"none"} />
        <Spacer />
        <ProfileCard userId={Number(userId)} />
        <Divider orientation="vertical" display={"none"} />
        <Spacer />
        <Box maxW="lg">
          <Suggested />
          <Developed />
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
