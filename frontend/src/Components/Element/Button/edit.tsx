import { Button, ButtonProps } from "@chakra-ui/react";

interface EditProps extends ButtonProps {}

export function EditProfile(props: EditProps) {
  return (
    <>
      <Button
        {...props}
        boxSize="6"
        rounded="20"
        position="relative"
        border="1px solid white"
        bg="#262626"
        color="white"
        fontWeight="md"
        _hover={{ bg: "white", color: "#262626" }}
      >
        Edit Profile
      </Button>
    </>
  );
}
