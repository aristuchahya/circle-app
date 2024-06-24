import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../libs/api";
import { FollowingEntity } from "../entities/follows";
import { FollowsCardProps } from "../../../Components/Element/Card/follows-card";
import { useState } from "react";

export const useFollows = ({
  userId,
  initialIsFollowing,
}: FollowsCardProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const queryClient = useQueryClient();
  const getFollowing = async () => {
    const response = await api.get(`/followings/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data.following;
  };

  const getFollowers = async () => {
    const response = await api.get(`/followers/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    return response.data;
  };

  const { data: followings } = useQuery<FollowingEntity[]>({
    queryKey: ["followings", userId],
    queryFn: getFollowing,
    enabled: !!localStorage.token,
  });

  const { data: followers } = useQuery<FollowingEntity[]>({
    queryKey: ["followers", userId],
    queryFn: getFollowers,
    enabled: !!localStorage.token,
  });

  const followMutation = useMutation({
    mutationFn: async () => {
      return await api.post(
        "/users/follow",
        { followingId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
    },
    // onSuccess: () => {
    //   console.log(`Successfully followed user with ID: ${userId}`);
    //   queryClient.invalidateQueries({ queryKey: ["followings", userId] });
    // },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["followings", userId] });
      await queryClient.cancelQueries({ queryKey: ["followers", userId] });

      const previousFollowings = queryClient.getQueryData<FollowingEntity[]>([
        "followings",
        userId,
      ]);
      const previousFollowers = queryClient.getQueryData<FollowingEntity[]>([
        "followers",
        userId,
      ]);

      setIsFollowing(true);

      queryClient.setQueryData<FollowingEntity[]>(
        ["followings", userId],
        (old) =>
          old
            ? [...old, { following: { id: userId } } as FollowingEntity]
            : [{ following: { id: userId } } as FollowingEntity]
      );

      return { previousFollowings, previousFollowers };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["followings", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: async () => {
      console.log(`Unfollowing user with ID: ${userId}`);
      return await api.delete("/unfollow", {
        data: { followingId: userId },
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
    },
    onSuccess: () => {
      console.log(`Successfully unfollowed user with ID: ${userId}`);
      queryClient.invalidateQueries({ queryKey: ["followings", userId] });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["followings", userId] });
      await queryClient.cancelQueries({ queryKey: ["followers", userId] });

      const previousFollowings = queryClient.getQueryData<FollowingEntity[]>([
        "followings",
        userId,
      ]);
      const previousFollowers = queryClient.getQueryData<FollowingEntity[]>([
        "followers",
        userId,
      ]);

      setIsFollowing(false);

      queryClient.setQueryData<FollowingEntity[]>(
        ["followings", userId],
        (old) => (old ? old.filter((f) => f.following.id !== userId) : [])
      );

      return { previousFollowings, previousFollowers };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["followings", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unFollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return {
    followings,
    followers,
    handleFollow,
    isFollowing,
  };
};
