import { useQuery } from "@tanstack/react-query";

import { api } from "../../../libs/api";
import { FollowingEntity } from "../entities/follows";

export const useFollows = (userId: number) => {
  const getFollowing = async () => {
    try {
      const response = await api.get(`/followings/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching followings:", error);
      throw new Error("Failed to fetch followings");
    }
  };

  const getFollowers = async () => {
    try {
      const response = await api.get(`/followers/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      console.log("getFollowers:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching followers:", error);
      throw new Error("Failed to fetch followers");
    }
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

  return {
    followings,
    followers,
  };
};
