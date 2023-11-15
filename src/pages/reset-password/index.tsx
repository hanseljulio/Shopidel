import Button from "@/components/Button";
import { IRegisterForm } from "@/interfaces/auth_interface";
import * as crypto from "crypto";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Pick<IRegisterForm, "password" | "confirmPassword">>();

  // console.log(decrypt(router.query.id?.toString()!));
  console.log(process.env);

  const onSubmit: SubmitHandler<
    Pick<IRegisterForm, "password" | "confirmPassword">
  > = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col items-center px-5 md:px-0">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full md:w-96">
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
                  notIncludeUsername: (v) =>
                    !v.includes("") || "Cannot contain username",
                },
              })}
              type="password"
              name="password"
              id="password"
              className="rounded-md border p-2"
            />
            {errors.password?.type === "validate" && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.password.message}
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
            {errors.confirmPassword?.type === "validate" && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
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
