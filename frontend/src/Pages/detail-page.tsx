import { Divider, Flex, Spacer } from "@chakra-ui/react";

import { DetailCard } from "../Components/Element/Card/detail-card";
import { RightBar } from "../features/home/components/right-bar";
import { Sidebar } from "../features/home/components/side-bar";

function DetailPage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <DetailCard />
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Flex>
    </>
  );
}

export default DetailPage;
