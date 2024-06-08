import { useMutation, useQuery } from "@tanstack/react-query";
import { ThreadEntity } from "../entities/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { threadSchema } from "../validator/use-thread";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThreadForm } from "../types/thread-types";
import { api } from "../../../libs/api";
import { AxiosError } from "axios";
import { useDisclosure } from "@chakra-ui/react";

export const useHomePage = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data: threads, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThreadForm>({
    mode: "onSubmit",
    resolver: zodResolver(threadSchema),
  });

  async function getThreads() {
    const response = await api.get("/threads", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  const { mutateAsync } = useMutation<ThreadEntity, AxiosError, ThreadForm>({
    mutationFn: (newThread) => {
      const formData = new FormData();
      formData.append("content", newThread.content);
      formData.append("image", newThread.image[0]);
      return api.post("/threads", formData);
    },
    onMutate: () => {
      onOpen();
    },
    onSettled: () => {
      onClose();
    },
    onSuccess: () => {
      reset();
      refetch();
    },
    onError: () => {
      console.error("Error posting thread", errors);
    },
  });

  const onSubmit: SubmitHandler<ThreadForm> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    threads,
    register,
    handleSubmit,
    onSubmit,
    isOpen,
    onClose,
    errors,
  };
};
