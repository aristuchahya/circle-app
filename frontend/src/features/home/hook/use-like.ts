import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../libs/api";

import { ThreadEntity } from "../entities/thread";
import { HomeThreadsProps } from "../components/home-threads";
import { useEffect, useState } from "react";

interface LikeData {
  threadId: number;
}
export const useLike = ({ thread }: HomeThreadsProps) => {
  const queryClient = useQueryClient();

  async function getLikes(threadId: number) {
    const response = await api.get(`/likes/${threadId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  const { data: likes } = useQuery<ThreadEntity>({
    queryKey: ["likes", thread.id],
    queryFn: () => getLikes(thread.id),
    initialData: thread,
  });

  const [localLikeCount, setLocalLikeCount] = useState(thread?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(thread?.isLikedUser || false);

  useEffect(() => {
    if (thread) {
      setLocalLikeCount(thread.likesCount);
      setIsLiked(thread.isLikedUser);
    }
  }, [thread]);

  const likeMutation = useMutation({
    mutationFn: async ({ threadId }: LikeData) => {
      const response = await api.post(
        "/likes",
        { threadId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      console.log("like response:", response.data);
      return response.data.thread;
    },
    onMutate: async ({ threadId }) => {
      await queryClient.cancelQueries({ queryKey: ["likes", threadId] });
      const previousThread = queryClient.getQueryData(["thread", threadId]);

      queryClient.setQueryData<ThreadEntity>(["thread", threadId], (old) => {
        if (old) {
          return {
            ...old,
            likesCount: old.isLikedUser
              ? old.likesCount - 1
              : old.likesCount + 1,
            isLikedUser: !old.isLikedUser,
          };
        }
        return old;
      });

      setLocalLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);

      return { previousThread };
    },

    onSettled: ({ threadId }) => {
      queryClient.invalidateQueries({ queryKey: ["likes", threadId] });
    },

    onSuccess: (data) => {
      setLocalLikeCount(data.likesCount);
      setIsLiked(false);
    },
  });

  return {
    likeThread: likeMutation.mutate,
    likes,
    likesCount: localLikeCount,
    isLikedUser: isLiked,
  };
};
