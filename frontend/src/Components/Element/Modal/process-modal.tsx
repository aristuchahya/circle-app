import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PostModalProps } from "./post-modal";

export function ProcessModal({ isOpen, onClose }: PostModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#1d1d1d"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner color="white" />
            <Text color="white" fontSize="sm" mt="3">
              Uploading....
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
