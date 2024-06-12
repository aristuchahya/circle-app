import {
  Divider,
  Avatar,
  AvatarBadge,
  Icon,
  Box,
  Heading,
  Spacer,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

import { LuImagePlus } from "react-icons/lu";

import { Post } from "../Button/post";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useHomePage } from "../../../features/home/hook/use-home";
import { ProcessModal } from "../Modal/process-modal";

export function Head() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { register, handleSubmit, onSubmit, errors, isOpen, onClose } =
    useHomePage();

  return (
    <>
      <Box m={"5"} maxWidth="xl">
        <Heading fontSize="xl" mb="5" fontWeight="semibold">
          Home
        </Heading>
        <Box display="flex">
          <Avatar size={"md"} mb="2" src={currentUser.photoProfile}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="2" isInvalid={!!errors.content}>
              <Textarea
                placeholder=" What is happening?!.."
                width="20em"
                height="10"
                resize="none"
                border="none"
                mt="3"
                {...register("content")}
              />
              <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>
            <Spacer />
            <Box display={"flex"} position="relative" left="20em" bottom="6em">
              <FormLabel htmlFor="upload-file" cursor={"pointer"}>
                <Icon
                  color={"green"}
                  mt="4"
                  me="1"
                  boxSize="5"
                  as={LuImagePlus}
                />
              </FormLabel>
              <Post type="submit" mt="4" fontSize="12">
                Post
              </Post>
            </Box>

            <FormControl isInvalid={!!errors.image}>
              <Input
                type="file"
                id="upload-file"
                display="none"
                hidden
                accept="image/*"
                {...register("image")}
              />
            </FormControl>
          </form>
          <ProcessModal isOpen={isOpen} onClose={onClose} />
        </Box>
        <Divider position="relative" bottom="14" />
      </Box>
    </>
  );
}
