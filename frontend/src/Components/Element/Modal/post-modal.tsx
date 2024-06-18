import {
  Avatar,
  AvatarBadge,
  FormControl,
  FormErrorMessage,
  FormLabel,
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

import { useHomePage } from "../../../features/home/hook/use-home";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProcessModal } from "./process-modal";

export interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ isOpen, onClose }: PostModalProps) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isOpen: isOpenModal,
    onClose: onCloseModal,
  } = useHomePage();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent bg="#1d1d1d">
            <ModalHeader></ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <HStack>
                <Avatar src={currentUser.photoProfile} size={"sm"} mb="2">
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
                <FormControl isInvalid={!!errors.content}>
                  <Input
                    placeholder=" What is happening?!.."
                    size="sm"
                    border="none"
                    color="white"
                    {...register("content")}
                  />
                  <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
                </FormControl>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <FormControl isInvalid={!!errors.image}>
                <Input
                  type="file"
                  id="upload-file"
                  hidden
                  accept="image/*"
                  {...register("image")}
                />
                <FormLabel htmlFor="upload-file" cursor={"pointer"}>
                  <Icon
                    color={"green"}
                    mt="2"
                    me="1"
                    boxSize="5"
                    as={LuImagePlus}
                  />
                </FormLabel>
                <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
              </FormControl>
              <Spacer />
              <Post type="submit" mt="2" fontSize="12">
                Post
              </Post>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <ProcessModal isOpen={isOpenModal} onClose={onCloseModal} />
    </>
  );
}
