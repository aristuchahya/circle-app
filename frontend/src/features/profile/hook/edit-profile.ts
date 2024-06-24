import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { UpdateForm } from "../types/use-update";
import { api } from "../../../libs/api";

import { SubmitHandler, useForm } from "react-hook-form";

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const getProfile = async () => {
    try {
      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const updateProfile = async (data: UpdateForm) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    if (data.photoProfile && data.photoProfile[0]) {
      formData.append("photoProfile", data.photoProfile[0]);
    }
    const response = await api.patch("/users/profile", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  };

  const { register, handleSubmit, reset } = useForm<UpdateForm>({
    defaultValues: {
      fullName: "",
      username: "",
      bio: "",
      photoProfile: new FileList(),
    },
  });

  const {
    data: users,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getProfile,
  });

  const editMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("Profile Update success", data);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
    },
    onError: () => {
      console.error("Error updating profile");
    },
  });

  const onSubmit: SubmitHandler<UpdateForm> = async (data) => {
    editMutation.mutate(data);
  };

  return { users, isPending, isFetching, register, handleSubmit, onSubmit };
};
