import { Input } from "@chakra-ui/react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  width: string;
  border?: string;
}

export function InputForm({
  type,
  placeholder,
  name,
  width,
  border,
}: InputProps) {
  return (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        size="md"
        width={width}
        border={border}
        variant="outline"
        mb="1"
        isRequired
      />
    </>
  );
}
