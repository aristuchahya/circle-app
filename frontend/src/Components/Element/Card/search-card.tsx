import {
  Avatar,
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TbUserSearch } from "react-icons/tb";
import { Follow } from "../Button/follow";
import { useSearch } from "../../../features/search/hooks/use-search";

export function SearchCard() {
  const { handleChange, searchData } = useSearch();
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
              onChange={handleChange}
            />
          </InputGroup>
        </Flex>
        {searchData.map((user) => (
          <Box mt="3" display={"flex"}>
            <Avatar size="md" src={user.photoProfile} />
            <VStack ms="3" spacing="0" align={"start"}>
              <Text fontSize="md">{user.fullName}</Text>
              <Text fontSize="sm" color="grey">
                @{user.username}
              </Text>
              <Text fontSize="md">{user.bio}</Text>
            </VStack>
            <Spacer />
            <Follow mt="3" />
          </Box>
        ))}
      </Box>
    </>
  );
}
