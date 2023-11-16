import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "@/store/userStore";

interface IChangePasswordForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const UserChangePassword = () => {
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IChangePasswordForm>();

  const onSubmit: SubmitHandler<IChangePasswordForm> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ProfileLayout currentPage="Change Password">
        <div className="p-5">
          <h1 className="text-3xl">Change password</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3 mt-5 bg-red w-fit "
          >
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-sm">
                  Old Password
                </label>
                <div className="w-fit">
                  <input
                    {...register("oldPassword", {
                      required: "Old password is required",
                    })}
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    className="rounded-md"
                  />
                </div>
                {errors.oldPassword?.type === "required" && (
                  <span role="alert" className="text-sm text-red-500">
                    {errors.oldPassword.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <div className="w-fit">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: {
                        minCharacters: (v) =>
                          v.length >= 8 || "Password minimum 8 characters",
                        maxCharacters: (v) =>
                          v.length <= 20 || "Password maximum 20 characters",
                        includeUppercase: (v) =>
                          /[A-Z]/g.test(v) ||
                          "Must include uppercase character",
                        notIncludeUsername: (v) =>
                          !v
                            .toLowerCase()
                            .includes(user?.username?.toLowerCase()!) ||
                          "Cannot contain username",
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    className="rounded-md"
                  />
                </div>
                {errors.password?.types ===
                  errors.password?.types?.validate && (
                  <span role="alert" className="text-sm text-red-500">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-sm">
                  Confirm password
                </label>
                <div className="w-fit">
                  <input
                    {...register("confirmPassword", {
                      validate: {
                        required: (v) =>
                          v.length !== 0 || "Confirm password is required",
                        matchPassword: (v) =>
                          v === getValues("password") || "Password not match",
                      },
                    })}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="rounded-md"
                  />
                </div>
                {errors.confirmPassword?.types ===
                  errors.confirmPassword?.types?.validate && (
                  <span role="alert" className="text-sm text-red-500">
                    {errors.confirmPassword?.message}
                  </span>
                )}
              </div>
            </div>
            <Button
              text="Submit"
              styling="bg-[#364968] w-fit p-2 rounded-md text-sm w-full text-white"
            />
          </form>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default UserChangePassword;
