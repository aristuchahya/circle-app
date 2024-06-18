import { useQuery } from "@tanstack/react-query";
import { api } from "../../../libs/api";

import { UserEntity } from "../../home/entities/user-entity";

export const useSuggested = () => {
  const getSuggested = async () => {
    const response = await api.get("/follows", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    return response.data;
  };

  const { data: suggested } = useQuery<UserEntity[]>({
    queryKey: ["suggested"],
    queryFn: getSuggested,
  });

  return { suggested };
};
