import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Follow } from "../Button/follow";
import { useSuggested } from "../../../features/follows/hook/use-suggested";

export function Suggested() {
  const { suggested } = useSuggested();
  return (
    <>
      <Card bg="#262626" m="4">
        <Heading color="white" fontSize="1.25em" m="4" fontWeight="bold">
          Suggested For You
        </Heading>
        <CardBody>
          <Flex direction={"column"} gap="2">
            {suggested &&
              suggested?.map((suggest) => (
                <HStack key={suggest.id}>
                  <Avatar boxSize="2em" src={suggest.photoProfile} />
                  <Box display="flex" flexDirection="column">
                    <Text color="white" fontSize="14" ms="3">
                      {suggest.fullName}
                    </Text>
                    <Text color="grey" fontSize="12" ms="3">
                      @{suggest.username}
                    </Text>
                  </Box>

                  <Spacer />
                  <Follow
                    userId={suggest.id}
                    initialIsFollowing={suggest.isFollowing}
                  ></Follow>
                </HStack>
              ))}
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
