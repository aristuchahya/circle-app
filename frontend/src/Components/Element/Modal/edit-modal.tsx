import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { PostModalProps } from "./post-modal";
import { HeadProfile } from "../Heading/head-profile";
import { Post } from "../Button/post";

export function EditModal({ isOpen, onClose }: PostModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1d1d1d">
          <ModalHeader color="white">Edit Profile</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <HeadProfile />
            <FormControl>
              <Stack>
                <FormLabel color="grey" fontSize="12">
                  Name
                </FormLabel>
                <Input
                  color="white"
                  placeholder="Enter your name"
                  border={"1px solid grey"}
                  position={"relative"}
                  bottom="3"
                />
              </Stack>
              <Stack>
                <FormLabel color="grey" fontSize="12">
                  username
                </FormLabel>
                <Input
                  color="white"
                  placeholder="Enter your username"
                  border={"1px solid grey"}
                  position={"relative"}
                  bottom="3"
                />
              </Stack>
              <Stack>
                <FormLabel color="grey" fontSize="12" mb={"0"}>
                  Bio
                </FormLabel>
                <Textarea
                  resize={"none"}
                  color={"white"}
                  placeholder="Enter your bio"
                />
              </Stack>
              <Divider />
              <Flex justify={"flex-end"} mt="2">
                <Post fs="14">Save</Post>
              </Flex>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
