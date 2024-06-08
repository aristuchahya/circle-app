import {
  Box,
  Link,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { LogoCircle } from "../../../Components/Element/Heading/logo-circle";
import { ListBar } from "../../../Components/List-Menu/list-bar";
import { CreatePost } from "../../../Components/Element/Button/post";
import { PostModal } from "../../../Components/Element/Modal/post-modal";
import { SlLogout } from "react-icons/sl";
import { useLogout } from "../../../Components/Element/Button/logout";

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
