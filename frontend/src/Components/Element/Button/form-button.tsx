import { Button } from "@chakra-ui/react";

interface BtnProps {
  children: string;
}

export function FormButton({ children }: BtnProps) {
  return (
    <>
      <Button
        type="submit"
        bgColor="green"
        size="md"
        width="80"
        color="white"
        rounded="15"
        _hover={{ bg: "white", color: "green" }}
      >
        {children}
      </Button>
    </>
  );
}
