import { Divider, Flex, Spacer } from "@chakra-ui/react";

import { SearchCard } from "../Components/Element/Card/search-card";
import { RightBar } from "../features/home/components/right-bar";
import { Sidebar } from "../features/home/components/side-bar";

function SearchPage() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Divider orientation="vertical" />
        <Spacer />
        <SearchCard />
        <Divider orientation="vertical" />
        <Spacer />
        <RightBar />
      </Flex>
    </>
  );
}

export default SearchPage;
