import {
  Box,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { PostModalProps } from "./post-modal";
import { Post } from "../Button/post";
import { useThreadsUpdate } from "../../../features/profile/hook/threads-update";
import { ThreadEntity } from "../../../features/home/entities/thread";

interface ThreadModalProps extends PostModalProps {
  thread: ThreadEntity;
}

export function ThreadModal({ isOpen, onClose, thread }: ThreadModalProps) {
  const { editContent, setEditContent, imageFile, setImageFile, updateThread } =
    useThreadsUpdate({ thread });

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await updateThread({ content: editContent, image: imageFile });
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} flexDirection={"column"} gap="3">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    resize={"none"}
                    value={editContent}
                    onChange={handleContentChange}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <Flex gap="2" justifyContent={"end"}>
                  <Post fontSize={"sm"} pb="1">
                    Cancel
                  </Post>
                  <Post type="submit" fontSize={"sm"} pb="1">
                    Save
                  </Post>
                </Flex>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
