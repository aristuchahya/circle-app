import { Input, InputProps } from "@chakra-ui/react";

interface InputType extends InputProps {
  name: string;
}

export function InputForm(props: InputType) {
  return (
    <>
      <Input size="md" variant="outline" mb="1" isRequired {...props} />
    </>
  );
}
