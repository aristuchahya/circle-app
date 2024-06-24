import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateForm } from "../types/use-update";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../libs/api";
import { useState } from "react";
import { UserEntity } from "../../home/entities/user-entity";

const updateUser = async (data: UpdateForm) => {
  try {
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
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  const response = await api.get("/user/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  const [uploading, setuploading] = useState<boolean>(false);

  const { data: user } = useQuery<UserEntity>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateForm>();

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
    },
    onError: (error) => {
      console.error("Error updating profile", error);
    },
    onSettled: () => {
      setuploading(false);
    },
  });

  const onSubmit: SubmitHandler<UpdateForm> = async (data) => {
    console.log(data);
    setuploading(true);
    updateMutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setValue,
    updateMutation,
    uploading,
    user,
  };
};

// const { mutateAsync } = useMutation<UserEntity, AxiosError, UpdateForm>({
//   mutationFn: async (data) => {
//     const formData = new FormData();
//     formData.append("fullName", data.fullName);
//     formData.append("username", data.username);
//     formData.append("bio", data.bio);
//     formData.append("photoProfile", data.photoProfile[0]);

//     const response = await api.patch("/users/profile", formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   },
//   onSuccess: (data) => {
//     console.log("Profile Update success", data);
//     queryClient.invalidateQueries({ queryKey: ["users"] });
//     reset();
//   },
//   onError: () => {
//     console.error("Error updating profile", errors);
//   },
// });

// const onSubmit: SubmitHandler<UpdateForm> = async (data) => {
//   console.log("Submitting Data", data);
//   try {
//     await mutateAsync(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
