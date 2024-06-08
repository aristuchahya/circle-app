import { Input, InputProps } from "@chakra-ui/react";
import React, { forwardRef } from "react";

interface InputType extends InputProps {
  name: string;
}

export const InputForm = forwardRef(function InputForm(
  props: InputType,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <Input
        size="md"
        variant="outline"
        mb="1"
        isRequired
        {...props}
        ref={ref}
      />
    </>
  );
});
