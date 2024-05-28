import { Button } from "@chakra-ui/react";

interface EditProps {
  fs?: string;
  bottom?: string;
  px?: string;
  py?: string;
  onClick?: () => void;
}

export function EditProfile({ fs, bottom, px, py, onClick }: EditProps) {
  return (
    <>
      <Button
        fontSize={fs}
        py={py}
        px={px}
        boxSize="6"
        rounded="20"
        position="relative"
        bottom={bottom}
        border="1px solid white"
        bg="#262626"
        color="white"
        fontWeight="md"
        onClick={onClick}
        _hover={{ bg: "white", color: "#262626" }}
      >
        Edit Profile
      </Button>
    </>
  );
}
