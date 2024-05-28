import { Divider, Flex, Spacer } from "@chakra-ui/react";
import { Sidebar } from "../Components/Sidebar/side-bar";
import { SearchCard } from "../Components/Element/Card/search-card";
import { RightBar } from "../Components/Sidebar/right-bar";

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
