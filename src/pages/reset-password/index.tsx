import Button from "@/components/Button";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IRegisterForm } from "@/interfaces/auth_interface";
import { API } from "@/network";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Pick<IRegisterForm, "password" | "confirmPassword">>();

  const onSubmit: SubmitHandler<
    Pick<IRegisterForm, "password" | "confirmPassword">
  > = async (data) => {
    const reqData = {
      token: router.query.token,
      password: data.password,
    };

    try {
      await toast.promise(
        API.put("/auth/request-forget-password", reqData),
        {
          pending: "Loading",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return (data.response?.data as IAPIResponse).message;
              }
            },
          },
          success: "Set new password success",
        },
        {
          autoClose: 1500,
          position: "top-center",
        }
      );
    } catch (e) {}
  };

  useEffect(() => {
    toast.onChange((data) => {
      if (axios.isAxiosError(data.data)) {
        if (data.status === "removed" && data.data.response?.status === 401) {
          return router.replace("/login");
        }
      } else {
        if (data.status === "removed") {
          return router.replace("/login");
        }
      }
    });
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-y-2 w-full md:w-96"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">
              Password
            </label>
            <input
              {...register("password", {
                validate: {
                  required: (v) => v.length !== 0 || "Password is required",
                  minCharacters: (v) =>
                    v.length >= 8 || "Password minimum 8 characters",
                  maxCharacters: (v) =>
                    v.length <= 20 || "Password maximum 20 characters",
                  includeUppercase: (v) =>
                    /[A-Z]/g.test(v) || "Must include uppercase character",
                },
              })}
              type="password"
              name="password"
              id="password"
              className="rounded-md border p-2"
            />
            {errors.password?.types === errors.password?.types?.validate && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">
              Confirm Password
            </label>
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
              className="rounded-md border p-2"
            />
            {errors.confirmPassword?.types ===
              errors.confirmPassword?.types?.validate && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <Button
              text="Submit"
              styling="bg-[#364968] text-white w-full rounded-md p-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
