import { Divider, Flex, Spacer } from "@chakra-ui/react";

import { FollowsCard } from "../Components/Element/Card/follows-card";
import { RightBar } from "../features/home/components/right-bar";
import { Sidebar } from "../features/home/components/side-bar";

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
