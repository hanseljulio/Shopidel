import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";
import { API } from "@/network";
import axios from "axios";
import {
  IAPIResponse,
  IAPIUpdatePhotoProfileResponse,
  IAPIUserProfileResponse,
} from "@/interfaces/api_interface";
import { GetServerSidePropsContext } from "next";
import { InferGetServerSidePropsType } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthSSR, clientUnauthorizeHandler } from "@/utils/utils";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";

const UserProfile = ({
  userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { user, updateUser } = useUserStore();
  const [imageFile, setImageFile] = useState<File | string>(
    userData?.profile_picture as string
  );

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<
    Omit<
      IAPIUserProfileResponse,
      "id" | "wallet_number" | "balance" | "forget_password_expired_at"
    >
  >({
    defaultValues: {
      username: userData?.username,
      birthdate: userData?.birthdate.substring(0, 10),
      email: userData?.email,
      full_name: userData?.full_name,
      gender: userData?.gender,
      phone_number: userData?.phone_number?.substring(3),
      profile_picture: userData?.profile_picture,
    },
  });

  const submit: SubmitHandler<
    Omit<
      IAPIUserProfileResponse,
      "id" | "wallet_number" | "balance" | "forget_password_expired_at"
    >
  > = async (data) => {
    try {
      toast.promise(
        API.put("/accounts/profile", data),
        {
          pending: "Updating...",
          success: "Profile update success!",
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
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
      }
    }
  };

  const profileImageHandler = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await toast.promise(
        API.put("/accounts/profile/change-photo", formData),
        {
          pending: "Loading",
          success: "Update photo success",
          error: "An error occured",
        },
        {
          autoClose: 1500,
        }
      );
      setImageFile(
        (res.data as IAPIResponse<IAPIUpdatePhotoProfileResponse>).data
          ?.image_url as string
      );
      updateUser({
        ...user,
        profile_picture: (
          res.data as IAPIResponse<IAPIUpdatePhotoProfileResponse>
        ).data?.image_url,
      } as IAPIUserProfileResponse);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
      }
    }
  };

  return (
    <div>
      <Head>
        <title>My Profile</title>
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      <ToastContainer />
      <ProfileLayout currentPage="My Profile">
        <div className="w-full p-5">
          <div className="pb-3 text-center md:text-left">
            <h1 className="text-[30px]">My Profile</h1>
            <p className="text-[18px]">Manage your account</p>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(submit)}
            className="flex flex-col md:flex-row items-center w-full"
          >
            <div className={`flex flex-col items-center w-96`}>
              <div>
                <img
                  src={`${
                    imageFile
                      ? typeof imageFile === "string"
                        ? imageFile
                        : URL.createObjectURL(imageFile as File)
                      : "/vm2/images/defaultuser.png"
                  }`}
                  alt="Nothing"
                  width={200}
                  height={200}
                  className={`w-[200px] h-[200px]`}
                  style={{
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                />
              </div>

              <label className="bg-[#364968] hover:cursor-pointer text-white py-2 px-4 rounded-md text-sm mt-2">
                <input
                  type="file"
                  className="hidden"
                  name="profile_picture"
                  id="profile_picture"
                  onChange={(e) => {
                    if (e.target.files?.length !== 0) {
                      profileImageHandler(e.target.files![0]);
                    }
                  }}
                />
                {!getValues("profile_picture")
                  ? "Upload profile photo"
                  : "Replace profile photo"}
              </label>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 md:mt-0 flex-1">
                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="username">
                    Username
                  </label>
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    type="text"
                    className="rounded-md"
                    name="username"
                    id="username"
                  />
                  {errors.username?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="emailEdit" className="text-sm">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    name="email"
                    id="email"
                    className="rounded-md"
                  />
                  {errors.email?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phoneNumber" className="text-sm">
                    Phone
                  </label>

                  <div className="relative w-full">
                    <input
                      {...register("phone_number", {
                        required: "Phone is required",
                        setValueAs: (v) => `+62${v}`,
                      })}
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="rounded-md w-full pl-12"
                    />
                    <div className="absolute left-0 bg-[#F3F4F5] border border-slate-500 h-full flex items-center px-2 rounded-tl-md rounded-bl-md top-0">
                      <span className="">+62</span>
                    </div>
                  </div>
                  {errors.phone_number?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="text-sm">
                    Full Name
                  </label>
                  <input
                    {...register("full_name", {
                      required: "Full name is required",
                    })}
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="rounded-md"
                  />
                  {errors.full_name?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.full_name.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender" className="text-sm">
                    Gender
                  </label>
                  <select
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                    name="gender"
                    id="gender"
                    className="rounded-md w-full"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.gender.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="dateOfBirth" className="text-sm">
                    Date of Birth
                  </label>
                  <input
                    {...register("birthdate", {
                      required: "Birthdate is required",
                      setValueAs: (v) => new Date(v).toISOString(),
                    })}
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    className="rounded-md w-full"
                  />
                  {errors.birthdate?.type === "required" && (
                    <span role="alert" className="text-sm text-red-500">
                      {errors.birthdate.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <Button
                  text="Save Changes"
                  styling="bg-[#364968] p-2 rounded-md text-white text-sm w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIUserProfileResponse | undefined;
  let auth = await checkAuthSSR(context);

  if (auth === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?session_expired=true",
      },
    };
  }

  try {
    const res = await API.get("/accounts/profile", {
      headers: {
        Authorization: `Bearer ${auth?.access_token}`,
        "Content-Type": "application/json",
      },
    });
    data = (res.data as IAPIResponse<IAPIUserProfileResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        redirect: {
          permanent: false,
          destination: "/?force_logout=true",
        },
      };
    }
  }

  return {
    props: {
      userData: data,
    },
  };
};
