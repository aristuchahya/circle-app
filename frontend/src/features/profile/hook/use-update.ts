import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateForm } from "../types/use-update";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSchema } from "../validator/use-update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEntity } from "../../home/entities/user-entity";
import { AxiosError } from "axios";
import { api } from "../../../libs/api";

export const useUpdate = () => {
  const queryClient = useQueryClient();
  // const { data: users, refetch } = useQuery<UserEntity>({
  //   queryKey: ["userProfile"],
  //   queryFn: getUser,
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateForm>({
    mode: "onSubmit",
    resolver: zodResolver(updateSchema),
  });

  // async function getUser() {
  //   const response = await api.get("/user/profile", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   return response.data;
  // }

  const { mutateAsync } = useMutation<UserEntity, AxiosError, UpdateForm>({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("bio", data.bio);
      if (data.photoProfile && data.photoProfile[0]) {
        formData.append("photoProfile", data.photoProfile[0]);
      }
      const response = await api.patch("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Profile Update success", data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
    },
    onError: () => {
      console.error("Error updating profile", errors);
    },
  });

  const onSubmit: SubmitHandler<UpdateForm> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
  };
};
