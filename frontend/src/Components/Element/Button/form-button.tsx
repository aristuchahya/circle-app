import { Button, ButtonProps } from "@chakra-ui/react";

interface BtnProps extends ButtonProps {}

export function FormButton(props: BtnProps) {
  return (
    <>
      <Button
        bgColor="green"
        size="md"
        width="80"
        color="white"
        rounded="15"
        _hover={{ bg: "white", color: "green" }}
        {...props}
      ></Button>
    </>
  );
}
