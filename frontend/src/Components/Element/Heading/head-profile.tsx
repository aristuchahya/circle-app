import { Avatar, Box, Image } from "@chakra-ui/react";
// import { RootState } from "../../../redux/store";
// import { useSelector } from "react-redux";
import { useUpdate } from "../../../features/profile/hook/use-update";

export function HeadProfile() {
  // const currentUser = useSelector((state: RootState) => state.auth.user);
  const { user } = useUpdate();
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
        src={user?.photoProfile}
      />
    </>
  );
}
