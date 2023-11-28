import React, { useState, useEffect } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { API } from "@/network";
import { IAPIResponse } from "@/interfaces/api_interface";
import Head from "next/head";

interface ICreateShowcaseData {
  name: string;
}

interface ISellerProductSelect {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  isChecked: boolean;
}

const SellerShowcaseCreatePage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ICreateShowcaseData>({
    mode: "onBlur",
  });

  const submit: SubmitHandler<ICreateShowcaseData> = async (data) => {
    const selectedProducts = [];

    for (let i = 0; i < sellerProducts.length; i++) {
      if (sellerProducts[i].isChecked) {
        selectedProducts.push(sellerProducts[i].id);
      }
    }

    if (selectedProducts.length === 0) {
      toast.error("Please select items in the product list.");
      return;
    }

    const sendData = {
      name: data.name,
      selected_products_id: selectedProducts,
    };

    try {
      toast.promise(
        API.post("/showcases", sendData),
        {
          pending: "Creating promotion...",
          success: {
            render() {
              router.push("/myshop/showcase");
              return "Showcase successfully created!";
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

  return (
    <SellerAdminLayout currentPage="Promotions">
      <Head>
        <title>Create Showcase</title>
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      <ToastContainer />
      <div className="w-full mx-auto mt-6">
        <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
          <h1 className="text-[30px]">Create Showcase</h1>
        </div>
        <div className="mx-[5%] pt-6">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col ">
              <label htmlFor="name" className="text-sm">
                Showcase name
              </label>
              <input
                {...register("name", {
                  required: "Showcase name is required",
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
            <div className="">
              <div className="flex justify-between items-center md:flex-row flex-col">
                <h1 className="text-[25px] py-6">Select Products</h1>
                <div className="flex items-center gap-6 md:pb-0 pb-6">
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer"
                    onClick={handleCheckAll}
                    name="allselect"
                  />
                  <p>Select all</p>
                </div>
              </div>
              <div className="bg-slate-300 h-[400px] overflow-y-scroll flex flex-col items-center">
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
                text="Create new showcase"
                styling="p-3 bg-[#364968] w-[300px] rounded-md text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerShowcaseCreatePage;
