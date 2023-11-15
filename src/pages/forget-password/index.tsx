import Button from "@/components/Button";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IUser } from "@/interfaces/user_interface";
import { API } from "@/network";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm<Pick<IUser, "email">>();
  const [successMsg, setSuccessMsg] = useState<string>("");

  const onSubmit: SubmitHandler<Pick<IUser, "email">> = async (data) => {
    try {
      const res = await toast.promise(
        API.post("/auth/request-forget-password", data),
        {
          pending: "Loading",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                const res = data.response?.data as IAPIResponse;
                return res.message;
              }
              console.log(data);
            },
          },
        },
        {
          autoClose: 1500,
          position: "top-center",
        }
      );

      setSuccessMsg((res.data as IAPIResponse).message!);
    } catch (e) {}
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ToastContainer />
      <div className="flex flex-col items-center w-full px-5 md:px-0">
        <h1 className="text-xl font-bold">Forget Password</h1>
        {successMsg !== "" ? (
          <h1>{successMsg}</h1>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 w-full md:w-96"
          >
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
            </div>
            <div className="mt-2">
              <Button
                text="Submit"
                styling="bg-[#364968] text-white w-full rounded-md p-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
