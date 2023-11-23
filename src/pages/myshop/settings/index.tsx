import Button from "@/components/Button";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IAPIProfileShopResponse } from "@/interfaces/seller_interface";
import { API } from "@/network";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

interface IShopProfileForm {
  seller_picture_url: string;
  seller_name: string;
  shop_name_slug: string;
  seller_description: string;
  seller_operating_hour: {
    start: string;
    end: string;
  };
}

const SellerSettings = () => {
  const [data, setData] = useState<IAPIProfileShopResponse>();
  const { user } = useUserStore();
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { register, handleSubmit, watch } = useForm<IShopProfileForm>();

  const getSellerDetail = async () => {
    try {
      const res = await API.get(`/sellers/${user?.id}/profile`);
      setData((res.data as IAPIResponse<IAPIProfileShopResponse>).data);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  const onSubmit: SubmitHandler<IShopProfileForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getSellerDetail();
  }, []);

  return (
    <SellerAdminLayout currentPage="Settings">
      <div className="p-5">
        <div className="flex items-center justify-between max-w-[50%]">
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
        <div className="mt-5 flex flex-col gap-y-5 max-w-[50%]">
          <div className="flex items-center gap-x-5">
            <div>
              <input
                ref={imageRef}
                type="file"
                name="shop_image"
                id="shop_image"
                onChange={(e) => {
                  if (e.target.files?.length !== 0) {
                    setImage(e.target.files![0]);
                  }
                }}
                hidden
              />
              <img
                src={
                  image ? URL.createObjectURL(image) : "/images/defaultuser.png"
                }
                width={100}
                alt="shop_image"
                className="hover:cursor-pointer"
                onClick={() => isEdit && imageRef.current?.click()}
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <div className="flex flex-col">
                <p>Shop name</p>
                {isEdit ? (
                  <input
                    {...register("seller_name", {
                      value: data?.seller_name,
                    })}
                    type="text"
                    name="seller_name"
                    id="seller_name"
                    className="rounded-md py-2"
                  />
                ) : (
                  <h1 className="text-xl  line-clamp-1">{data?.seller_name}</h1>
                )}
              </div>
              <div className="flex flex-col">
                <p>Shop slug</p>
                {isEdit ? (
                  <input
                    {...register("shop_name_slug", {
                      value: data?.shop_name_slug,
                    })}
                    type="text"
                    name="shop_name_slug"
                    id="shop_name_slug"
                    className="rounded-md py-2"
                  />
                ) : (
                  <h1 className="text-xl line-clamp-1">
                    {data?.shop_name_slug}
                  </h1>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <p>Shop description</p>
            {isEdit ? (
              <textarea
                {...register("seller_description", {
                  value: data?.seller_description,
                })}
                name=""
                id=""
                className="rounded-md w-full h-52 resize-none"
              />
            ) : (
              <p>{data?.seller_description}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <p>Shop operating hours</p>
            <h1 className="text-xl">
              {isEdit ? (
                <input
                  {...register("seller_operating_hour.start")}
                  type="time"
                  className="rounded-md"
                  name="seller_operating_hour.start"
                  id="seller_operating_hour.start"
                />
              ) : (
                data?.seller_operating_hour.start
              )}{" "}
              -{" "}
              {isEdit ? (
                <input
                  {...register("seller_operating_hour.end")}
                  type="time"
                  className="rounded-md"
                  name="seller_operating_hour.end"
                  id="seller_operating_hour.end"
                />
              ) : (
                data?.seller_operating_hour.end
              )}
            </h1>
          </div>
          {isEdit && (
            <div className="self-end">
              <Button
                text="Update"
                onClick={handleSubmit(onSubmit)}
                styling="bg-[#364968] p-2 rounded-md text-white text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerSettings;
