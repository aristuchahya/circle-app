import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReplyEntity } from "../entities/reply";
import { api } from "../../../libs/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReplyForm } from "../types/reply-types";
import { AxiosError } from "axios";

import { HomeThreadsProps } from "../components/home-threads";
import { useState } from "react";

export const useReply = ({ thread }: HomeThreadsProps) => {
  const queryClient = useQueryClient();
  const { data: replies } = useQuery<ReplyEntity[]>({
    queryKey: ["reply", thread.id],
    queryFn: getReply,
    enabled: !!thread.id,
  });

  const { data: replyCountData } = useQuery<{ count: number }>({
    queryKey: ["replyCount", thread.id],
    queryFn: () => getCountReply(thread.id),
    enabled: !!thread.id,
  });

  const replyCount = replyCountData?.count || 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReplyForm>();
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [showComment, setShowComment] = useState<boolean>(false);

  async function getReply() {
    const response = await api.get(`threads/${thread.id}/replies`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  async function getCountReply(threadId: number) {
    if (!thread.id) throw new Error("thread id not found");
    const response = await api.get<{ count: number }>(
      `replies/${threadId}/count`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    return response.data;
  }

  const { mutateAsync } = useMutation<ReplyEntity, AxiosError, ReplyForm>({
    mutationFn: (newReply) => {
      return api.post(`replies/${thread.id}`, newReply, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reply", thread.id] });
      reset();
    },
    onError: () => {
      console.error("Error posting reply", errors);
    },
  });

  const handleReplyClick = () => {
    setIsCommenting(!isCommenting);
  };

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  const onSubmit: SubmitHandler<ReplyForm> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    replies,
    replyCount,
    handleReplyClick,
    onSubmit,
    isCommenting,
    toggleComment,
    showComment,
  };
};
