import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Follow } from "../Element/Button/follow";

import { EditProfile } from "../Element/Button/edit";
import { EditModal } from "../Element/Modal/edit-modal";
import { useState } from "react";

export function RightBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box m="5" maxW="lg">
        <Card bg="#262626">
          <CardBody>
            <Heading fontSize="xl" m="3" ms="1" color="white" fontWeight="bold">
              My Profile
            </Heading>
            <Box
              bg="blue"
              borderRadius="lg"
              p={4}
              position="relative"
              overflow="hidden"
              w="100%"
              h="70"
            />
            <Avatar
              boxSize="3.5em"
              border="3px solid black"
              position="relative"
              bottom="9"
              left="5"
              src={
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              }
            ></Avatar>
            <Flex justify="flex-end">
              <EditProfile fs="12" px="12" py="3" bottom="6" onClick={onOpen} />
              <EditModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            <Flex direction="column" position="relative" bottom="4">
              <Text color="white" fontSize="xl" fontWeight="semibold">
                Aristu Chahya
              </Text>
              <Text color="grey" fontSize="12" mb="2">
                @arist
              </Text>
              <Text color="white" fontSize="12" fontWeight="medium">
                Lorem ipsum dolor sit amet
              </Text>
              <HStack spacing={"2"}>
                <Text color="white" fontSize="12">
                  290
                </Text>
                <Text color="grey" fontSize="12">
                  Following
                </Text>
                <Text color="white" fontSize="12">
                  100
                </Text>
                <Text color="grey" fontSize="12">
                  Likes
                </Text>
              </HStack>
            </Flex>
          </CardBody>
        </Card>
        <Card bg="#262626" mt="3">
          <Heading color="white" fontSize="1.25em" m="4" fontWeight="bold">
            Suggested For You
          </Heading>
          <CardBody>
            <Flex direction={"column"} gap="2">
              <HStack>
                <Avatar boxSize="2em" />
                <VStack spacing="0">
                  <Text color="white" fontSize="14" ms="3">
                    Huda Aditya
                  </Text>
                  <Text color="grey" fontSize="12" me="6">
                    @huda
                  </Text>
                </VStack>
                <Spacer />
                <Button
                  fontSize="14"
                  px="12"
                  py="3"
                  boxSize="6"
                  rounded="20"
                  position="relative"
                  border="1px solid grey"
                  bg="#262626"
                  color="grey"
                  fontWeight="md"
                >
                  Following
                </Button>
              </HStack>
              <UserFollow />
            </Flex>
          </CardBody>
        </Card>

        <Card bg="#262626" mt="3">
          <CardBody>
            <HStack spacing="3">
              <Text color="white" fontWeight="medium" fontSize="14">
                Developed By Aristu
              </Text>
              <Spacer />
              <Icon color="grey" as={FaGithub} />
              <Icon color="grey" as={FaLinkedin} />
              <Icon color="grey" as={FaInstagram} />
              <Icon color="grey" as={FaFacebook} />
            </HStack>
            <Text color="grey" fontSize={"12"}>
              Powered by Dumbways Indonesia Coding Bootcamp #1 Indonesia
            </Text>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

export function UserFollow() {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };
  return (
    <>
      <HStack>
        <Avatar boxSize="2em" />
        <VStack spacing="0">
          <Text color="white" fontSize="14" ms="3">
            Ahmad Yahya
          </Text>
          <Text color="grey" fontSize="12" me="6">
            @ahmad
          </Text>
        </VStack>
        <Spacer />
        <Follow
          fontSize="14"
          onClick={handleFollow}
          isFollowing={isFollowing}
        ></Follow>
      </HStack>
      <HStack>
        <Avatar boxSize="2em" />
        <VStack spacing="0">
          <Text color="white" fontSize="14" ms="3">
            Fajar Satrio
          </Text>
          <Text color="grey" fontSize="12" me="6">
            @fajar
          </Text>
        </VStack>
        <Spacer />
        <Follow
          fontSize="14"
          onClick={handleFollow}
          isFollowing={isFollowing}
        ></Follow>
      </HStack>
      <HStack>
        <Avatar boxSize="2em" />
        <VStack spacing="0">
          <Text color="white" fontSize="14" ms="3">
            Cahyo Pratama
          </Text>
          <Text color="grey" fontSize="12" me="10">
            @cahyo
          </Text>
        </VStack>
        <Spacer />
        <Follow
          fontSize="14"
          onClick={handleFollow}
          isFollowing={isFollowing}
        ></Follow>
      </HStack>
    </>
  );
}
