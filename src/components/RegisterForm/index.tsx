import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { useRouter } from "next/router";
import { IRegisterForm } from "@/interfaces/auth_interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "@/network";
import axios from "axios";
import { IAPIResponse } from "@/interfaces/api_interface";

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    let registerData: Omit<IRegisterForm, "confirmPassword"> = {
      email: data.email,
      full_name: data.full_name,
      password: data.password,
      username: data.username,
    };

    try {
      toast.promise(
        API.post("/auth/register", registerData),
        {
          pending: "Loading",
          success: "Register success",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return `${(data.response?.data as IAPIResponse).message}`;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    toast.onChange((data) => {
      if (data.status === "removed" && data.type === "success") {
        router.push("/login");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-96 px-5 py-10 rounded-md flex flex-col gap-y-5"
      >
        <h1 className="text-xl font-bold">Register</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm">
            Fullname
          </label>
          <input
            {...register("full_name", { required: "Fullname is required" })}
            type="text"
            name="full_name"
            id="full_name"
            className="rounded-md border p-2"
          />
          {errors.full_name?.type === "required" && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.full_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            name="username"
            id="username"
            className="rounded-md border p-2"
          />
          {errors.username?.type === "required" && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            id="email"
            className="rounded-md border p-2"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              validate: {
                minCharacters: (v) =>
                  v.length >= 8 || "Password minimum 8 characters",
                maxCharacters: (v) =>
                  v.length <= 20 || "Password maximum 20 characters",
                includeUppercase: (v) =>
                  /[A-Z]/g.test(v) || "Must include uppercase character",
                notIncludeUsername: (v) =>
                  !v.includes(getValues("username")) ||
                  "Cannot contain username",
              },
            })}
            type="password"
            name="password"
            id="password"
            className="rounded-md border p-2"
            maxLength={20}
          />
          {errors.password?.type === errors.password?.types?.required && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.password?.message}
            </p>
          )}
          {errors.password?.types === errors.password?.types?.validate && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: {
                matchPassword: (v) =>
                  v === getValues("password") || "Password not match",
              },
            })}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="rounded-md border p-2"
          />
          {errors.confirmPassword?.type ===
            errors.confirmPassword?.types?.required && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.confirmPassword?.message}
            </p>
          )}
          {errors.confirmPassword?.types ===
            errors.confirmPassword?.types?.validate && (
            <p role="alert" className="text-xs text-red-500 mt-1">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <Button
          text="Submit"
          styling="p-2 bg-[#364968] w-full rounded-md text-white"
        />
      </form>
      <p className="text-sm text-center">
        Have an account?{" "}
        <span
          className="font-bold hover:cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login here
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
