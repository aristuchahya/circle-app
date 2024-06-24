import { useQuery } from "@tanstack/react-query";

import { api } from "../../../libs/api";

export const useTotalLike = (userId: number) => {
  const { data: totalLike } = useQuery<number>({
    queryKey: ["totalLike", userId],
    queryFn: async () => {
      const response = await api.get(`/likes/total/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      return response.data.totalLike;
    },
  });

  return { totalLike };
};
