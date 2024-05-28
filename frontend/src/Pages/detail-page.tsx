import { Divider, Flex, Spacer } from "@chakra-ui/react";
import { Sidebar } from "../Components/Sidebar/side-bar";
import { DetailCard } from "../Components/Element/Card/detail-card";
import { RightBar } from "../Components/Sidebar/right-bar";

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
