import { Divider, Flex, Spacer } from "@chakra-ui/react";

import { FollowsCard } from "../Components/Element/Card/follows-card";
import { RightBar } from "../features/home/components/right-bar";
import { Sidebar } from "../features/home/components/side-bar";
import { useParams } from "react-router-dom";

function FollowsPage() {
  const { id } = useParams<{ id: string }>();

  const initialIsFollowing = false;

  return (
    <>
      <Flex>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <FollowsCard {...{ userId: Number(id), initialIsFollowing }} />
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Flex>
    </>
  );
}

export default FollowsPage;
