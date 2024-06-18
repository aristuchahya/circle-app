import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ThreadUser } from "../../../Components/Element/Card/post-card";
import { ThreadEntity } from "../../home/entities/thread";
import { AxiosError } from "axios";
import { ThreadForm } from "../../home/types/thread-types";
import { api } from "../../../libs/api";

export const useThreadsUpdate = ({ thread }: ThreadUser) => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(thread.content);
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const { mutateAsync } = useMutation<ThreadEntity, AxiosError, ThreadForm>({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("content", data.content);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      const response = await api.patch(`/threads/${thread.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onMutate: async (newThread) => {
      await queryClient.cancelQueries({ queryKey: ["threads", thread.id] });

      const previousThread = queryClient.getQueryData(["threads", thread.id]);

      if (previousThread) {
        queryClient.setQueryData(["threads", thread.id], {
          ...previousThread,
          ...newThread,
        });
      }

      return { previousThread, newThread };
    },

    onError: () => {
      console.error("Error updating thread");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["threads", thread.id] });
    },
  });

  const deleteMutation = useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      return await api.delete(`/threads/${thread.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["threads", thread.id] });

      const previousThreads = queryClient.getQueryData<ThreadEntity[]>([
        "threads",
      ]);
      if (previousThreads) {
        queryClient.setQueryData(
          ["threads"],
          previousThreads.filter((t) => t.id !== thread.id)
        );
      }
    },

    onError: () => {
      console.error("Error deleting thread");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const updateThread = async (data: ThreadForm) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Error updating thread", error);
    }
  };

  const deleteThread = async () => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error("Error deleting thread", error);
    }
  };
  return {
    isEdit,
    setIsEdit,
    editContent,
    setEditContent,
    imageFile,
    setImageFile,
    updateThread,
    deleteThread,
  };
};
