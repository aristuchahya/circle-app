import {
  Box,
  Link,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";

import { CreatePost } from "../Element/Button/post";
import { SlLogout } from "react-icons/sl";
import { ListBar } from "../List-Menu/list-bar";
import { useLogout } from "../Element/Button/logout";
import { LogoCircle } from "../Element/Heading/logo-circle";
import { PostModal } from "../Element/Modal/post-modal";

export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useLogout();
  return (
    <div>
      <Box maxW="xl" m="5">
        <LogoCircle mb={"3"} />
        <ListBar />
        <CreatePost onClick={onOpen} />
        <PostModal isOpen={isOpen} onClose={onClose} />
        <List position="relative" top="15em">
          <ListItem fontSize="large">
            <ListIcon as={SlLogout} />
            <Link
              _hover={{ textDecoration: "none", color: "gray.300" }}
              onClick={logout}
            >
              Logout
            </Link>
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
