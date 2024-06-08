import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { PostCard } from "./post-card";
import { ThreadProps } from "./card";
import { HeadProfile } from "../Heading/head-profile";
import { EditProfile } from "../Button/edit";
import { EditModal } from "../Modal/edit-modal";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export function ProfileCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeLink, setActiveLink] = useState("");
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const [users, setUsers] = useState<ThreadProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/data.json");
      const data: ThreadProps[] = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Box maxW="2xl" m="5" ms="6">
        <Heading fontSize="2xl">
          <Icon as={FaArrowLeftLong} pt="2" /> {currentUser.fullName}
        </Heading>
        <Box>
          <HeadProfile />
          <Flex justify={"end"} position={"relative"} bottom="10">
            <EditProfile fontSize="12" px="12" py="3" onClick={onOpen} />
          </Flex>
          <EditModal isOpen={isOpen} onClose={onClose} />
        </Box>

        <Heading fontSize="xl">{currentUser.fullName}</Heading>
        <Text color="grey" fontSize="14" mb="2">
          @{currentUser.username}
        </Text>
        <Text fontSize="14" fontWeight="medium">
          {currentUser.bio}
        </Text>
        <HStack spacing={"2"}>
          <Text fontSize="12">290</Text>
          <Text color="grey" fontSize="12">
            Following
          </Text>
          <Text fontSize="12">100</Text>
          <Text color="grey" fontSize="12">
            Likes
          </Text>
        </HStack>

        <HStack mt="5" mb="3">
          <Link
            ms="20"
            onClick={() => handleLinkClick("allPosts")}
            borderBottom={activeLink === "allPosts" ? "2px solid " : "none"}
            borderColor={"green"}
            _hover={{ textDecoration: "none" }}
          >
            All Posts
          </Link>
          <Spacer />
          <Link
            me="20"
            onClick={() => handleLinkClick("media")}
            borderBottom={activeLink === "media" ? "2px solid " : "none"}
            borderColor={"green"}
            _hover={{ textDecoration: "none" }}
          >
            Media
          </Link>
        </HStack>
        {users.map((user) => (
          <PostCard
            key={user.id}
            name={user.name}
            username={user.username}
            avatar={user.avatar}
            image={user.image}
            post={user.post}
            like={user.like}
            comment={user.comment}
          />
        ))}
      </Box>
    </>
  );
}
