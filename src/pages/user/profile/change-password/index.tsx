import React, { useState } from "react";
import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API } from "@/network";
import "react-toastify/dist/ReactToastify.css";
import { IAPIResponse } from "@/interfaces/api_interface";
import { useRouter } from "next/router";
import { clientUnauthorizeHandler } from "@/utils/utils";
import Head from "next/head";

interface IChangePasswordForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
  otp: string;
}

const UserChangePassword = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const requestOtp = async () => {
    try {
      await toast.promise(API.get("/accounts/profile/request-otp"), {
        pending: "Loading",
        error: "An error occured",
      });
      setIsModal(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Change Password</title>
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      {isModal && (
        <Modal
          content={
            <div className="p-2">
              <ChangePasswordForm />
            </div>
          }
          onClose={() => setIsModal(false)}
        />
      )}
      <ProfileLayout currentPage="Change Password">
        <div className="p-5">
          <h1 className="text-3xl">Change password</h1>
          <div className="mt-2">
            <Button
              text="Request change password"
              styling="bg-[#364968] w-fit p-2 rounded-md text-sm  text-white"
              onClick={requestOtp}
            />
          </div>
        </div>
      </ProfileLayout>
    </>
  );
};

const ChangePasswordForm = () => {
  const { user, updateUser } = useUserStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IChangePasswordForm>();

  const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
    try {
      await toast.promise(
        API.post("/accounts/profile/change-password", {
          otp: data.otp,
          old_password: data.old_password,
          new_password: data.new_password,
        }),
        {
          pending: "Loading",
          success: "Success, you need to re-login",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return (data.response?.data as IAPIResponse).message;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );

      clientUnauthorizeHandler(router, updateUser);
    } catch (e) {}
  };

  return (
    <>
      <h1 className="text-center text-xl font-bold">Change password</h1>
      <p className="text-sm text-center">Check your email for OTP code</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 mt-5 bg-red w-fit "
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col">
            <label htmlFor="old_password" className="text-sm">
              Old Password
            </label>
            <div className="w-fit">
              <input
                {...register("old_password", {
                  required: "Old password is required",
                })}
                type="password"
                name="old_password"
                id="old_password"
                className="rounded-md"
              />
            </div>
            {errors.old_password?.type === "required" && (
              <span role="alert" className="text-sm text-red-500">
                {errors.old_password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">
              New password
            </label>
            <div className="w-fit">
              <input
                {...register("new_password", {
                  required: "Password is required",
                  validate: {
                    minCharacters: (v) =>
                      v.length >= 8 || "Password minimum 8 characters",
                    maxCharacters: (v) =>
                      v.length <= 20 || "Password maximum 20 characters",
                    includeUppercase: (v) =>
                      /[A-Z]/g.test(v) || "Must include uppercase character",
                    notIncludeUsername: (v) =>
                      !v
                        .toLowerCase()
                        .includes(user?.username?.toLowerCase()!) ||
                      "Cannot contain username",
                  },
                })}
                type="password"
                name="new_password"
                id="new_password"
                className="rounded-md"
              />
            </div>
            {errors.new_password?.types ===
              errors.new_password?.types?.validate && (
              <span role="alert" className="text-sm text-red-500">
                {errors.new_password?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm">
              Confirm new password
            </label>
            <div className="w-fit">
              <input
                {...register("confirm_password", {
                  validate: {
                    required: (v) =>
                      v.length !== 0 || "Confirm password is required",
                    matchPassword: (v) =>
                      v === getValues("new_password") || "Password not match",
                  },
                })}
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="rounded-md"
              />
            </div>
            {errors.confirm_password?.types ===
              errors.confirm_password?.types?.validate && (
              <span role="alert" className="text-sm text-red-500">
                {errors.confirm_password?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm">
              OTP Code
            </label>
            <div className="w-fit">
              <input
                {...register("otp", {
                  required: "OTP is required",
                })}
                type="password"
                name="otp"
                id="otp"
                className="rounded-md"
              />
            </div>
            {errors.otp?.type && (
              <span role="alert" className="text-sm text-red-500">
                {errors.otp?.message}
              </span>
            )}
          </div>
        </div>
        <Button
          text="Submit"
          styling="bg-[#364968] w-fit p-2 rounded-md text-sm w-full text-white"
        />
      </form>
    </>
  );
};

export default UserChangePassword;
