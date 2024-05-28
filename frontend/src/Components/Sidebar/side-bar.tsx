import { Box, Heading, Link, List, ListIcon, ListItem } from "@chakra-ui/react";

import { CreatePost } from "../Element/Button/post";
import { SlLogout } from "react-icons/sl";
import { ListBar } from "../List-Menu/list-bar";

export function Sidebar() {
  return (
    <div>
      <Box maxW="xl" m="5">
        <Heading color="#04A51E" size="3xl">
          circle
        </Heading>
        <ListBar />
        <CreatePost />
        <List position="relative" top="15em">
          <ListItem fontSize="large">
            <ListIcon as={SlLogout} />
            <Link
              href="#logout"
              _hover={{ textDecoration: "none", color: "gray.300" }}
            >
              Logout
            </Link>
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
