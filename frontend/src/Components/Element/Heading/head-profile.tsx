import { Avatar, Box, Image } from "@chakra-ui/react";

export function HeadProfile() {
  return (
    <>
      <Box borderRadius="lg" overflow="hidden" w="100%" h="70">
        <Image
          src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          w="100%"
          objectFit="cover"
        />
      </Box>
      <Avatar
        boxSize="3.5em"
        border="3px solid black"
        bottom="9"
        left="3"
        src={
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        }
      />
    </>
  );
}
