import Button from "@/components/Button";
import { ILoginForm } from "@/interfaces/auth_interface";
import { API } from "@/network";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  IAPILoginResponse,
  IAPIResponse,
  IAPIUserProfileResponse,
} from "@/interfaces/api_interface";
import { useUserStore } from "@/store/userStore";
import { setAuthCookie } from "@/utils/utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const { updateUser } = useUserStore();
  const router = useRouter();

  const getUserData = async (token: string) => {
    try {
      const res = await API.get("/accounts/profile");
      updateUser((res.data as IAPIResponse<IAPIUserProfileResponse>).data!);
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const loginHandler: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res = await toast.promise(
        API.post("/auth/login", data),
        {
          pending: "Loading",
          success: {
            render({ data }) {
              const res = data?.data as IAPIResponse<IAPILoginResponse>;
              setAuthCookie(res.data!);
              return res.message;
            },
          },
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                console.log(data);
                return data.response?.statusText;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
      await getUserData(
        (res.data as IAPIResponse<IAPILoginResponse>).data!.access_token
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        toast.error(e.message, { autoClose: 1500 });
      }
    }
  };

  useEffect(() => {
    updateUser(undefined);
  }, []);

  return (
    <div className=" h-screen flex justify-between items-center">
      <ToastContainer />
      <div className="max-w-7xl w-full mx-auto flex justify-around items-center">
        <div className="hidden md:flex">
          <img
            src={"/images/auth_hero.png"}
            width={400}
            height={400}
            alt="auth_hero"
          />
        </div>
        <div className="">
          <form
            className="w-96 px-5 py-10 rounded-md flex flex-col gap-y-5"
            onSubmit={handleSubmit(loginHandler)}
          >
            <h1 className="text-xl font-bold">Login</h1>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                name="email"
                id="email"
                className="rounded-md border p-2"
              />
              {errors.email && (
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
                {...register("password", { required: "Password is required" })}
                type="password"
                name="password"
                id="password"
                className="rounded-md border p-2"
              />
              {errors.password && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Button
                text="Login"
                styling="p-2 bg-[#364968] w-full rounded-md text-white"
                onClick={() => console.log("login")}
              />
              <p className="text-xs text-end hover:cursor-pointer mt-1 ">
                Forget password
              </p>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center px-5">
            <div className="flex w-full justify-center items-center">
              <div className="h-[0.5px] bg-slate-500 w-full"></div>
              <p className="text-center text-sm text-slate-500 w-full">
                Or login with
              </p>
              <div className="h-[0.5px] bg-slate-500 w-full"></div>
            </div>
            <div className="bg-white shadow-md rounded-md p-3 w-fit border mt-2 hover:cursor-pointer">
              <div className="flex justify-center items-center gap-x-2">
                <FcGoogle size={20} />
                <p className="text-sm">Google</p>
              </div>
            </div>
            <p className="text-sm mt-5">
              Don&apos;t have an account?{" "}
              <span
                className="font-bold hover:cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
