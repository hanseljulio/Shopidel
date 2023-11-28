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
import { ISellerPromotionData } from "@/interfaces/seller_interface";
import { IAPIResponse } from "@/interfaces/api_interface";
import Head from "next/head";

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
  } = useForm<ISellerPromotionData>({
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

  const submit: SubmitHandler<ISellerPromotionData> = async (data) => {
    const sendData = {
      name: data.name,
      quota: parseInt(data.quota.toString()),
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      min_purchase_amount: data.min_purchase_amount,
      max_purchase_amount: data.max_purchase_amount,
      discount_amount: data.discount_amount,
    };

    try {
      toast.promise(
        API.post("/shop-promotions", sendData),
        {
          pending: "Creating promotion...",
          success: {
            render() {
              router.push("/myshop/promotions");
              return "Promotion successfully created!";
            },
          },
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

  return (
    <SellerAdminLayout currentPage="Promotions">
      <Head>
        <title>Create Promotion</title>
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      <ToastContainer />
      <div className="w-full mx-auto mt-6">
        <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
          <h1 className="text-[30px]">Create Promotion</h1>
        </div>
        <div className="mx-[5%] pt-6">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col ">
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
            <div className="flex md:flex-row justify-between pt-6 md:gap-10 flex-col gap-6">
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="quota" className="text-sm">
                  Promotion quota
                </label>
                <input
                  {...register("quota", {
                    required: "Promotion quota is required",
                    validate: {
                      greaterThanZero: (v) =>
                        v > 0 || "Quota must be greater than 0",
                    },
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
                <label htmlFor="start_date" className="text-sm">
                  Start Date
                </label>
                <input
                  {...register("start_date", {
                    required: "Start date is required",
                  })}
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="rounded-md border p-2"
                />
                {errors.start_date?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.start_date.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="end_date" className="text-sm">
                  End date
                </label>
                <input
                  {...register("end_date", {
                    required: "End date is required",
                  })}
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="rounded-md border p-2"
                />
                {errors.end_date?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.end_date.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex md:flex-row justify-between pt-6 md:gap-10 flex-col gap-6">
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="min_purchase_amount" className="text-sm">
                  Minimum purchase amount
                </label>
                <input
                  {...register("min_purchase_amount", {
                    required: "Minimum purchase amount is required",
                  })}
                  type="number"
                  name="min_purchase_amount"
                  id="min_purchase_amount"
                  className="rounded-md border p-2 "
                />
                {errors.min_purchase_amount?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.min_purchase_amount.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="max_purchase_amount" className="text-sm">
                  Maximum purchase amount
                </label>
                <input
                  {...register("max_purchase_amount", {
                    required: "Maximum purchase amount is required",
                  })}
                  type="number"
                  name="max_purchase_amount"
                  id="max_purchase_amount"
                  className="rounded-md border p-2"
                />
                {errors.max_purchase_amount?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.max_purchase_amount.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:basis-[33.3%]">
                <label htmlFor="discount_amount" className="text-sm">
                  Discount amount
                </label>
                <input
                  {...register("discount_amount", {
                    required: "Discount amount is required",
                  })}
                  type="number"
                  name="discount_amount"
                  id="discount_amount"
                  className="rounded-md border p-2 w-full"
                />
                {errors.discount_amount?.type === "required" && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.discount_amount.message}
                  </p>
                )}
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
