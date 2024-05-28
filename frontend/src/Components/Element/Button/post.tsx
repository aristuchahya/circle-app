import { Button } from "@chakra-ui/react";

export function CreatePost() {
  return (
    <>
      <Button
        bgColor="#04A51E"
        size="md"
        ps="16"
        pe="16"
        color="white"
        rounded="15"
        mt="10"
        _hover={{ bg: "white", color: "green" }}
      >
        Create Post
      </Button>
    </>
  );
}

interface PostProps {
  children: string;
  mt?: string;
  fs?: string;

  onclick?: () => void;
}
export function Post({ children, mt, fs, onclick }: PostProps) {
  return (
    <>
      <Button
        mt={mt}
        rounded="15"
        ps="7"
        pe="7"
        boxSize="5"
        fontSize={fs}
        bg="#04A51E"
        color="white"
        position={"relative"}
        onClick={onclick}
        _hover={{ bg: "white", color: "green" }}
      >
        {children}
      </Button>
    </>
  );
}
