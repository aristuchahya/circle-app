import { Button } from "@chakra-ui/react";

interface TextProps {
  children: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  fontSize?: string;
  mt?: string;
}

export function Follow({
  children,
  top,
  left,
  right,
  bottom,
  fontSize,
  mt,
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
        color="white"
        fontWeight="md"
        _hover={{ bg: "white", color: "black" }}
      >
        {children}
      </Button>
    </>
  );
}
