import {
  Avatar,
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { PostModalProps } from "./post-modal";
import { Camera } from "lucide-react";

import { Post } from "../Button/post";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
import { useUpdate } from "../../../features/profile/hook/use-update";

export function EditModal({ isOpen, onClose }: PostModalProps) {
  // const currentUser = useSelector((state: RootState) => state.auth.user);
  const { register, handleSubmit, onSubmit, isSubmitting, uploading, user } =
    useUpdate();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1d1d1d">
          <ModalHeader color="white">Edit Profile</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Box borderRadius="lg" overflow="hidden" w="100%" h="70">
              <Image
                src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                w="100%"
                objectFit="cover"
              />
            </Box>
            <Avatar
              boxSize="3.5em"
              border="3px solid black"
              bottom="9"
              left="3"
              src={user?.photoProfile}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel
                  position="relative"
                  bottom="5em"
                  left="7"
                  htmlFor="upload-file"
                >
                  <Camera color="white" size="35" />
                </FormLabel>
                <Input
                  type="file"
                  id="upload-file"
                  accept="image/*"
                  {...register("photoProfile")}
                />
              </FormControl>
              <FormControl>
                <Stack>
                  <FormControl>
                    <FormLabel color="grey" fontSize="12">
                      Name
                    </FormLabel>
                    <Input
                      color="white"
                      placeholder="Enter your name"
                      border={"1px solid grey"}
                      position={"relative"}
                      bottom="3"
                      {...register("fullName")}
                    />
                  </FormControl>
                </Stack>
                <Stack>
                  <FormControl>
                    <FormLabel color="grey" fontSize="12">
                      username
                    </FormLabel>
                    <Input
                      color="white"
                      placeholder="Enter your username"
                      border={"1px solid grey"}
                      position={"relative"}
                      bottom="3"
                      {...register("username")}
                    />
                  </FormControl>
                </Stack>
                <Stack>
                  <FormControl>
                    <FormLabel color="grey" fontSize="12" mb={"0"}>
                      Bio
                    </FormLabel>
                    <Textarea
                      resize={"none"}
                      color={"white"}
                      placeholder="Enter your bio"
                      {...register("bio")}
                    />
                  </FormControl>
                </Stack>
                <Divider />
                <Flex justify={"flex-end"} mt="2">
                  <Post type="submit" fontSize="14" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                  </Post>
                </Flex>
              </FormControl>
              {uploading && <Spinner />}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
