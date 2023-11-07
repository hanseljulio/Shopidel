import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";
import { API } from "@/network";
import axios from "axios";
import {
  IAPIResponse,
  IAPIUserProfileResponse,
} from "@/interfaces/api_interface";
import { GetServerSidePropsContext } from "next";
import { InferGetServerSidePropsType } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import { emailConverter } from "@/utils/utils";
import Dropdown from "@/components/Dropdown";

const UserProfile = ({
  userData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showEditEmail, setShowEditEmail] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState<
    IAPIUserProfileResponse | undefined
  >({
    id: "",
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    gender: "",
    birthdate: "",
    profile_picture: "",
    wallet_number: "",
    balance: "",
    forget_password_expired_at: "",
  });

  const toggleEditEmail = () => {
    setShowEditEmail((prevBool) => !prevBool);
  };

  useEffect(() => {
    setUserDetails(userData);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      full_name: userData?.full_name,
      username: userData?.username,
      email: userData?.email,
      phone_number: userData?.phone_number,
      gender: userData?.gender,
      birthdate: userData?.birthdate,
      profile_picture: userData?.profile_picture,
    };

    console.log(updatedData);

    try {
      toast.promise(
        API.put("/accounts", updatedData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
            "Content-Type": "application/json",
          },
        }),
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
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  // Function for getting image from cloudinary
  const urlToLink = async (link: string) => {
    const randomName =
      Math.floor(Math.random() * (999999 - 100000) + 100000).toString() +
      ".jpg";

    let imgFile = fetch(link).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], randomName);
      return file;
    });

    return imgFile;
  };

  const getFile = async (link: File | string) => {
    let result = await urlToLink(typeof link === "string" ? link : "");
    return result;
  };

  return (
    <div>
      <ToastContainer />
      <ProfileLayout currentPage="My Profile">
        <div className="w-fit mx-auto mt-10">
          <div className="edit-profile-header pb-3 mobile:text-center">
            <h1 className="text-[30px]">My Profile</h1>
            <p className="text-[18px]">Manage your account</p>
          </div>

          <form action="" onSubmit={submit}>
            <div className="form-section-wrapper flex gap-[150px] mobile:gap-[20px] mobile:flex-col mobile:items-center">
              <div className="form-section-div">
                <Input
                  label="Username"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[57px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="text"
                  name="username"
                  value={userDetails!.username}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails!,
                      username: e.target.value,
                    });
                  }}
                />
                <div className="email-section flex items-center pb-[30px] mobile:flex-col mobile:items-start">
                  <p className="">Email</p>
                  {showEditEmail ? (
                    <Input
                      label=""
                      styling="flex items-center gap-[91px] mobile:gap-0 mobile:py-4"
                      width="w-[250px]"
                      type="email"
                      name="emailEdit"
                      value={userDetails!.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails!,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="ml-[91px] mobile:m-0 mobile:py-4">
                      {emailConverter(userDetails?.email!)}
                    </p>
                  )}
                  <p
                    onClick={toggleEditEmail}
                    className="text-blue-600 underline hover:cursor-pointer ml-[30px] mobile:m-0"
                  >
                    {showEditEmail ? "Go back" : "Change email"}
                  </p>
                </div>
                <Input
                  label="Phone"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[85px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="text"
                  name="phoneNumber"
                  value={userDetails!.phone_number}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails!,
                      phone_number: e.target.value,
                    })
                  }
                />
                <Input
                  label="Full Name"
                  labelStyle="mt-2"
                  styling="flex items-center gap-[58px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  type="text"
                  value={userData?.full_name}
                  name="fullName"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails!,
                      full_name: e.target.value,
                    })
                  }
                />
                <Dropdown
                  label="Gender"
                  labelStyle="mt-2"
                  width="w-[250px]"
                  value={userDetails!.gender}
                  flexLabel="flex items-center gap-[77px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  options={["male", "female"]}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails!,
                      gender: e.target.value,
                    })
                  }
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={userDetails!.birthdate.substring(0, 10)}
                  styling="flex items-center gap-[36px] pb-[30px] mobile:flex-col mobile:gap-2 mobile:items-start"
                  width="w-[250px]"
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails!,
                      birthdate: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </div>

              <div
                className={`flex-col justify-center items-center admin-edit-photo p-4 mobile:mx-auto`}
              >
                <img
                  src={`${imageFile === null
                    ? "/images/defaultuser.png"
                    : imageFile === undefined
                      ? "/images/defaultuser.png"
                      : URL.createObjectURL(imageFile)
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
                <br />
                <label className="custom-file-upload bg-[#364968] hover:cursor-pointer text-white p-4 rounded-[10px] ml-1.5 text-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files !== null) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                  />
                  {!userDetails?.profile_picture
                    ? "Upload profile photo"
                    : "Replace profile photo"}
                </label>
              </div>
            </div>
            <div className="submit-btn mobile:text-center mobile:py-[50px] ml-[250px] mobile:mx-auto">
              <Button
                text="Save Changes"
                onClick={submit}
                styling="bg-[#364968] text-white p-3 rounded-[8px] w-[300px] my-4"
              />
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
  let accessToken = context.req.cookies["accessToken"];

  try {
    const res = await API.get("/accounts/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = (res.data as IAPIResponse<IAPIUserProfileResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
    }
  }

  return {
    props: {
      userData: data,
    },
  };
};
