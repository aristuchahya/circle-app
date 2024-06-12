import { useQuery } from "@tanstack/react-query";
import { ThreadEntity } from "../../home/entities/thread";
import { api } from "../../../libs/api";

export const useProfile = (userId: number) => {
  const { data: threads, isLoading } = useQuery<ThreadEntity[]>({
    queryKey: ["threads", userId],
    queryFn: getThreadsUser,
  });

  async function getThreadsUser() {
    try {
      const response = await api.get(`/users/${userId}/threads`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching threads", error);
      return undefined;
    }
  }

  return { threads, isLoading };
};
