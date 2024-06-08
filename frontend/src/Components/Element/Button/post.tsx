import { Button, ButtonProps } from "@chakra-ui/react";

interface ButtonPostProps extends ButtonProps {}
export function CreatePost(props: ButtonPostProps) {
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
        {...props}
      >
        Create Post
      </Button>
    </>
  );
}

interface PostProps extends ButtonProps {}
export function Post(props: PostProps) {
  return (
    <>
      <Button
        {...props}
        rounded="15"
        ps="7"
        pe="7"
        boxSize="5"
        bg="#04A51E"
        color="white"
        _hover={{ bg: "white", color: "green" }}
      ></Button>
    </>
  );
}
