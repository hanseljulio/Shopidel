import React, { useEffect, useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { API } from "@/network";
import axios from "axios";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ISellerPromotion } from "@/interfaces/seller_interface";

interface ISellerProductSelect {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  isChecked: boolean;
}

const SellerPromotionCreate = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ISellerPromotion>({
    mode: "onBlur",
  });

  const [sellerProducts, setSellerProducts] = useState<ISellerProductSelect[]>([
    {
      id: 23,
      name: "TAS SLING BAG CANVAS 2 SIZE MEDIUM & LARGE",
      category_id: 936,
      created_at: "2023-11-21T05:36:43.520268Z",
      updated_at: "2023-11-21T05:36:43.520268Z",
      deleted_at: "0001-01-01T00:00:00Z",
      isChecked: false,
    },
  ]);

  const handleCheckAll = (e: any) => {
    const { checked } = e.target;
    const currentData = [...sellerProducts];

    const updatedData = currentData.map((data) => {
      return { ...data, isChecked: checked };
    });

    setSellerProducts(updatedData);
  };

  const handleCheck = (e: any, id: number) => {
    const { checked } = e.target;
    const currentData = [...sellerProducts];

    const updatedData = currentData.map((data) => {
      if (data.id === id) {
        return { ...data, isChecked: checked };
      } else {
        return data;
      }
    });
    setSellerProducts(updatedData);
  };

  const router = useRouter();
  const { updateUser } = useUserStore();

  const getSellerProducts = async () => {
    try {
      const response = await API.get(`sellers/products`);
      setSellerProducts(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  const submit: SubmitHandler<ISellerPromotion> = async (data) => {
    const selectedProducts = [];

    for (let i = 0; i < sellerProducts.length; i++) {
      if (sellerProducts[i].isChecked) {
        selectedProducts.push(sellerProducts[i].id);
      }
    }

    const sendData = {
      name: data.name,
      quota: data.quota,
      startDate: data.startDate,
      endDate: data.endDate,
      minItems: data.minItems,
      maxItems: data.maxItems,
      discountPercentage: data.discountPercentage,
      selectedProducts: selectedProducts,
    };

    console.log(sendData);
  };

  return (
    <SellerAdminLayout currentPage="Promotions">
      <div className="w-full mx-auto mt-6">
        <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
          <h1 className="text-[30px]">Create Promotion</h1>
        </div>
        <div className="md:mx-[5%] pt-6">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm">
                Promotion Name
              </label>
              <input
                {...register("name", {
                  required: "Promotion name is required",
                })}
                type="text"
                name="name"
                id="name"
                className="rounded-md border p-2"
              />
              {errors.name?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex md:flex-row justify-between pt-6 md:gap-10">
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="quota" className="text-sm">
                  Promotion quota
                </label>
                <input
                  {...register("quota", {
                    required: "Promotion quota is required",
                  })}
                  type="number"
                  name="quota"
                  id="quota"
                  className="rounded-md border p-2 "
                />
                {errors.quota?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.quota.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="startDate" className="text-sm">
                  Start Date
                </label>
                <input
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="rounded-md border p-2"
                />
                {errors.startDate?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="endDate" className="text-sm">
                  End date
                </label>
                <input
                  {...register("endDate", {
                    required: "End date is required",
                  })}
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="rounded-md border p-2"
                />
                {errors.endDate?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex md:flex-row justify-between pt-6 md:gap-10">
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="minItems" className="text-sm">
                  Minimum items
                </label>
                <input
                  {...register("minItems", {
                    required: "Minimum items is required",
                  })}
                  type="number"
                  name="minItems"
                  id="minItems"
                  className="rounded-md border p-2 "
                />
                {errors.minItems?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.minItems.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="maxItems" className="text-sm">
                  Maximum items
                </label>
                <input
                  {...register("maxItems", {
                    required: "Maximum items is required",
                  })}
                  type="number"
                  name="maxItems"
                  id="maxItems"
                  className="rounded-md border p-2"
                />
                {errors.maxItems?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.maxItems.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="discountPercentage" className="text-sm">
                  Discount percentage
                </label>
                <div className="relative">
                  <input
                    {...register("discountPercentage", {
                      required: "Discount percentage is required",
                    })}
                    type="number"
                    name="discountPercentage"
                    id="discountPercentage"
                    className="rounded-md border p-2 w-full"
                  />
                  <div className="absolute right-0 bg-[#F3F4F5] border border-slate-500 h-full flex items-center px-2 rounded-tr-md rounded-br-md top-0">
                    <span className="">%</span>
                  </div>
                </div>
                {errors.discountPercentage?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between items-center ">
                <h1 className="text-[25px] py-6">Select Products</h1>
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer"
                    onClick={handleCheckAll}
                    name="allselect"
                  />
                  <p>Select all</p>
                </div>
              </div>
              <div className="bg-slate-300 h-[300px] overflow-y-scroll flex flex-col items-center">
                {sellerProducts.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white border-2 rounded-md  p-6 flex gap-6 items-center my-3 w-[95%]"
                    >
                      <input
                        onClick={(e) => handleCheck(e, product.id)}
                        type="checkbox"
                        className="hover:cursor-pointer"
                        checked={product.isChecked}
                      />
                      <h1>{product.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center pt-6 py-10">
              <Button
                text="Create new promotion"
                styling="p-3 bg-[#364968] w-[300px] rounded-md text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerPromotionCreate;
