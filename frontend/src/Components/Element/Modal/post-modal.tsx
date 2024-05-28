import {
  Avatar,
  AvatarBadge,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { Post } from "../Button/post";

export interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1d1d1d">
          <ModalHeader></ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <HStack>
              <Avatar size={"sm"} mb="2">
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
              <Input
                placeholder=" What is happening?!.."
                size="sm"
                border="none"
              ></Input>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Icon color={"green"} mt="2" me="1" boxSize="5" as={LuImagePlus} />
            <Spacer />
            <Post mt="2" fs="12">
              Post
            </Post>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
