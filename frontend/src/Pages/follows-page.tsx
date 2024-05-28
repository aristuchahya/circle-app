import { Divider, Flex, Spacer } from "@chakra-ui/react";
import { Sidebar } from "../Components/Sidebar/side-bar";
import { FollowsCard } from "../Components/Element/Card/follows-card";
import { RightBar } from "../Components/Sidebar/right-bar";

function FollowsPage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <FollowsCard />
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Flex>
    </>
  );
}

export default FollowsPage;
