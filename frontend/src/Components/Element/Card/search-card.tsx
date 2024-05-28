import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { TbUserSearch } from "react-icons/tb";

export function SearchCard() {
  return (
    <>
      <Box maxW="xl" m="5">
        <Flex direction="column">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={TbUserSearch} color="#B2B2B2" />
            </InputLeftElement>
            <Input
              size="md"
              width="xl"
              variant="outline"
              mb="1"
              rounded="20"
              placeholder="Search your friend"
              type="text"
              name="search"
            />
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}
