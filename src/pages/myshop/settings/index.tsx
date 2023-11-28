import Button from "@/components/Button";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IAPIProfileShopResponse } from "@/interfaces/seller_interface";
import { API } from "@/network";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

interface IShopProfileForm {
  shop_name: string;
  shop_description: string;
  opening_hours: string;
  closing_hours: string;
}

const SellerSettings = () => {
  const [data, setData] = useState<IAPIProfileShopResponse>();
  const { user } = useUserStore();
  const router = useRouter();
  const [descCounter, setDescCounter] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { register, handleSubmit, watch } = useForm<IShopProfileForm>();

  const getSellerDetail = async () => {
    try {
      const res = await API.get(`/sellers/${user?.id}/profile`);
      setData((res.data as IAPIResponse<IAPIProfileShopResponse>).data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setDescCounter(data.seller_description.length);
    }
  }, [data]);

  const onSubmit: SubmitHandler<IShopProfileForm> = async (data) => {
    try {
      await toast.promise(
        API.put("/sellers", data),
        {
          pending: "Loading",
          error: "Error update profile",
          success: "Update profile success",
        },
        {
          autoClose: 1500,
        }
      );
      router.reload();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getSellerDetail();
  }, []);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      <SellerAdminLayout currentPage="Settings">
        <div className="p-5">
          <div className="flex items-center justify-between  lg:max-w-[50%]">
            <h1 className="text-3xl">Settings</h1>
            <div
              className="flex gap-x-1 items-center hover:cursor-pointer"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? (
                <>
                  <TiDelete size={20} />
                  <p>Discard</p>
                </>
              ) : (
                <>
                  <AiFillEdit size={15} />
                  <p>Edit</p>
                </>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-y-5 lg:max-w-[50%]">
            <div className="flex items-center gap-x-5">
              <div>
                <img
                  src={
                    data?.seller_picture_url !== ""
                      ? data?.seller_picture_url
                      : "/vm2/images/defaultuser.png"
                  }
                  width={100}
                  alt="shop_image"
                />
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <div className="flex flex-col">
                  <p>Shop name</p>
                  {isEdit ? (
                    <input
                      {...register("shop_name", {
                        value: data?.seller_name,
                      })}
                      type="text"
                      name="shop_name"
                      id="shop_name"
                      className="rounded-md py-2"
                    />
                  ) : (
                    <h1 className="text-xl  line-clamp-1">
                      {data?.seller_name}
                    </h1>
                  )}
                </div>
                <div className="flex flex-col">
                  <p>Shop slug</p>
                  <h1 className="text-xl line-clamp-1">
                    {data?.shop_name_slug}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <p>Shop description</p>
              {isEdit ? (
                <>
                  <textarea
                    {...register("shop_description", {
                      value: data?.seller_description,
                      onChange: (e) => {
                        setDescCounter(e.target.value.length);
                      },
                    })}
                    maxLength={140}
                    name="shop_description"
                    id="shop_description"
                    className="rounded-md w-full h-52 resize-none"
                  />
                  <span className="text-xs self-end">{descCounter}/140</span>
                </>
              ) : (
                <p>{data?.seller_description}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <p>Shop operating hours</p>
              <h1 className="text-xl">
                {isEdit ? (
                  <input
                    {...register("opening_hours", {
                      value: data?.seller_operating_hour.start,
                    })}
                    type="time"
                    className="rounded-md"
                    name="opening_hours"
                    id="opening_hours"
                  />
                ) : (
                  data?.seller_operating_hour.start
                )}{" "}
                -{" "}
                {isEdit ? (
                  <input
                    {...register("closing_hours", {
                      value: data?.seller_operating_hour.end,
                    })}
                    type="time"
                    className="rounded-md"
                    name="closing_hours"
                    id="closing_hours"
                  />
                ) : (
                  data?.seller_operating_hour.end
                )}
              </h1>
            </div>
            {isEdit && (
              <div className="lg:self-end">
                <Button
                  text="Update"
                  onClick={handleSubmit(onSubmit)}
                  styling="bg-[#364968] w-full p-2 rounded-md text-white text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerSettings;
