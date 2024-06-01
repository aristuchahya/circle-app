import { Button } from "@chakra-ui/react";

interface TextProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  fontSize?: string;
  mt?: string;
  onClick?: () => void;
  isFollowing?: boolean;
}

export function Follow({
  top,
  left,
  right,
  bottom,
  fontSize,
  mt,
  onClick,
  isFollowing,
}: TextProps) {
  return (
    <>
      <Button
        fontSize={fontSize}
        mt={mt}
        px="12"
        py="3"
        boxSize="6"
        rounded="20"
        position="relative"
        left={left}
        top={top}
        right={right}
        bottom={bottom}
        border="1px solid white"
        bg="#262626"
        color={isFollowing ? "grey" : "white"}
        fontWeight="md"
        onClick={onClick}
        _hover={{ bg: "white", color: "black" }}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </>
  );
}
