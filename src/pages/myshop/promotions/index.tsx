import SellerAdminLayout from "@/components/SellerAdminLayout";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import {
  ISellerPromotionData,
  ISellerPromotion,
} from "@/interfaces/seller_interface";
import Modal from "@/components/Modal";
import { currencyConverter, dateConverter } from "@/utils/utils";
import { API } from "@/network";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { IAPIResponse } from "@/interfaces/api_interface";
import { SubmitHandler, useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import Head from "next/head";

interface IDeletePromoModal {
  closeFunction: () => void;
  submitFunction: () => void;
}

const DeletePromoModal = (props: IDeletePromoModal) => {
  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[180px] w-[99%]">
      <div className="pb-3 text-center">
        <h1 className="text-[20px] ml-1">
          Are you sure you want to delete this promotion?
        </h1>
        <h1>This can&apos;t be undone!</h1>
      </div>

      <div className="flex justify-center mt-3 gap-6">
        <Button
          text="Yes"
          onClick={props.submitFunction}
          styling="bg-red-600 p-3 rounded-[8px] w-[100px] text-white my-4"
        />
        <Button
          text="No"
          onClick={props.closeFunction}
          styling="bg-[#364968] p-3 rounded-[8px] w-[100px] text-white my-4"
        />
      </div>
    </div>
  );
};

interface IOrderDetailModalProps {
  promoId: number;
}

interface IPromoDetails {
  id: number;
  name: string;
  min_purchase_amount: string;
  max_purchase_amount: string;
  discount_amount: string;
  quota: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

const OrderDetailModal = (props: IOrderDetailModalProps) => {
  const [promoDetail, setPromoDetail] = useState<IPromoDetails>();
  const router = useRouter();
  const { updateUser } = useUserStore();

  const getPromoData = async () => {
    try {
      const response = await API.get(`shop-promotions/${props.promoId}`);
      setPromoDetail(response.data.data);
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
    getPromoData();
  }, []);

  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[500px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Promotion Details</h1>
      </div>
      <div className="pt-4">
        <h1>Name: {promoDetail?.name}</h1>
        <h1>Available quota: {promoDetail?.quota}</h1>
      </div>
      <div className="pt-4">
        <h1>
          Start date:{" "}
          {dateConverter(
            promoDetail ? promoDetail.start_date.substring(0, 10) : "1970-01-01"
          )}
        </h1>

        <h1>
          End date:{" "}
          {dateConverter(
            promoDetail ? promoDetail.end_date.substring(0, 10) : "1970-01-01"
          )}
        </h1>
      </div>
      <div className="pt-4">
        <h1>
          Minimum purchase:{" "}
          {currencyConverter(
            promoDetail ? parseInt(promoDetail?.min_purchase_amount) : 0
          )}
        </h1>
        <h1>
          Maximum purchase:{" "}
          {currencyConverter(
            promoDetail ? parseInt(promoDetail?.max_purchase_amount) : 0
          )}
        </h1>
        <h1>
          Discount amount:{" "}
          {currencyConverter(
            promoDetail ? parseInt(promoDetail?.discount_amount) : 0
          )}
        </h1>
      </div>
    </div>
  );
};

interface IEditPromoProps {
  promoId: number;
  exitFunction: () => void;
}

const EditPromo = (props: IEditPromoProps) => {
  const router = useRouter();
  const { updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISellerPromotionData>({
    mode: "onBlur",
    defaultValues: {},
  });

  const getPromoData = async () => {
    try {
      const response = await API.get(`shop-promotions/${props.promoId}`);

      const currentData = {
        id: response.data.data.id,
        name: response.data.data.name,
        quota: response.data.data.quota,
        start_date: response.data.data.start_date.substring(0, 10),
        end_date: response.data.data.end_date.substring(0, 10),
        min_purchase_amount: response.data.data.min_purchase_amount,
        max_purchase_amount: response.data.data.max_purchase_amount,
        discount_amount: response.data.data.discount_amount,
      };

      reset({ ...currentData });
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
    getPromoData();
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
        API.put(`/shop-promotions/${props.promoId}`, sendData),
        {
          pending: "Updating promotion...",
          success: {
            render() {
              props.exitFunction();
              return "Promotion successfully updated!";
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
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[500px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Edit Promotion</h1>
      </div>
      <div className=" pt-6">
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
              <label htmlFor="discountPercentage" className="text-sm">
                Discount amount
              </label>
              <input
                {...register("discount_amount", {
                  required: "Discount amount is required",
                })}
                type="number"
                name="discountAmount"
                id="discountAmount"
                className="rounded-md border p-2 w-full"
              />
              {errors.discount_amount?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.discount_amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-14">
            <Button
              text="Edit promotion"
              styling="p-3 bg-[#364968] w-[300px] rounded-md text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerAdminHome = () => {
  const [currentPage, setCurrentPage] = useState<string>("all");
  const [promotionData, setPromotionData] = useState<ISellerPromotion>();
  const router = useRouter();
  const { user, updateUser } = useUserStore();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [selectedPromoId, setSelectedPromoId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getPromotionData = async () => {
    try {
      const response = await API.get(`/shop-promotions?page=${page}&limit=10`);

      const currentData = response.data.data;

      if (currentPage === "ongoing") {
        const updatedData = currentData.filter((data: any) => {
          let currentTime = new Date().getTime();
          let endTime = new Date(data.end_date).getTime();
          let startTime = new Date(data.start_date).getTime();
          return currentTime <= endTime && currentTime >= startTime;
        });
        response.data.data = updatedData;
        setPromotionData(response.data);
      } else if (currentPage === "upcoming") {
        const updatedData = currentData.filter((data: any) => {
          let currentTime = new Date().getTime();
          let startTime = new Date(data.start_date).getTime();
          return currentTime <= startTime;
        });
        response.data.data = updatedData;
        setPromotionData(response.data);
      } else if (currentPage === "ended") {
        const updatedData = currentData.filter((data: any) => {
          let currentTime = new Date().getTime();
          let endTime = new Date(data.end_date).getTime();
          return endTime <= currentTime;
        });
        response.data.data = updatedData;
        setPromotionData(response.data);
      } else {
        setPromotionData(response.data);
      }
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
    if (user !== undefined && !user.is_seller) {
      router.push("/myshop");
    }
  }, [user]);

  useEffect(() => {
    getPromotionData();
  }, [currentPage, page]);

  const duplicatePromo = async (id: number) => {
    let currentData;
    try {
      const response = await API.get(`shop-promotions/${id}`);
      console.log("HERE");
      console.log(response.data.data);
      currentData = response.data.data;
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

    const sendData = {
      name: currentData.name,
      quota: currentData.quota,
      start_date: currentData.start_date,
      end_date: currentData.end_date,
      min_purchase_amount: currentData.min_purchase_amount,
      max_purchase_amount: currentData.max_purchase_amount,
      discount_amount: currentData.discount_amount,
    };

    try {
      toast.promise(
        API.post("/shop-promotions", sendData),
        {
          pending: "Duplicating promotion...",
          success: {
            render() {
              getPromotionData();
              return "Promotion successfully duplicated!";
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

  const deletePromo = async () => {
    try {
      toast.promise(
        API.delete(`/shop-promotions/${selectedPromoId}`),
        {
          pending: "Deleting promotion...",
          success: {
            render() {
              getPromotionData();
              return "Promotion successfully deleted!";
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
    <>
      {showEditModal && (
        <Modal
          content={
            <EditPromo
              promoId={selectedPromoId}
              exitFunction={() => {
                setShowEditModal(false);
                getPromotionData();
              }}
            />
          }
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDetailModal && (
        <Modal
          content={<OrderDetailModal promoId={selectedPromoId} />}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          content={
            <DeletePromoModal
              submitFunction={() => {
                deletePromo();
                setShowDeleteModal(false);
              }}
              closeFunction={() => setShowDeleteModal(false)}
            />
          }
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      <SellerAdminLayout currentPage="Promotions">
        <ToastContainer />
        <Head>
          <title>Promotions</title>
        </Head>
        <div className="w-full mx-auto mt-6">
          <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
            <h1 className="text-[30px]">Promotions</h1>
            <div className="flex items-center gap-3">
              <p className="font-bold">Sort by: </p>
              <select
                onChange={(e) => setCurrentPage(e.target.value)}
                className={`p-4 w-[150px] h-14 rounded`}
                name="category-dropdown"
              >
                <option value={"all"}>{"All"}</option>
                <option value={"ongoing"}>{"Ongoing"}</option>
                <option value={"upcoming"}>{"Upcoming"}</option>
                <option value={"ended"}>{"Ended"}</option>
              </select>
            </div>
            <Button
              text="Create new promotion"
              onClick={() => router.push("/myshop/promotions/create")}
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] my-4"
            />
          </div>
          <div className="mx-[5%] ">
            {!promotionData || promotionData.data.length === 0 ? (
              <h1 className="font-bold text-[25px] text-center pt-4">
                You have no promotions at the moment.
              </h1>
            ) : (
              <div className="flex flex-col gap-6 pt-4">
                {promotionData?.data.map((data, index) => {
                  return (
                    <div key={index} className="border-2 border-black p-6">
                      <div className="flex justify-between items-center md:flex-row flex-col">
                        <div className="md:text-left text-center">
                          <h1 className="text-[25px]">{data.name}</h1>
                          <br />

                          <h1 className="font-bold ">
                            {dateConverter(data.start_date.substring(0, 10))} to{" "}
                            {dateConverter(data.end_date.substring(0, 10))}
                          </h1>
                          <h1>
                            Min items:{" "}
                            {data.min_purchase_amount === "0"
                              ? "None"
                              : data.min_purchase_amount}
                          </h1>
                          <h1>
                            Max items:{" "}
                            {data.max_purchase_amount === "0"
                              ? "None"
                              : data.max_purchase_amount}
                          </h1>
                        </div>
                        <div className="md:text-right flex flex-col md:gap-3 md:items-end gap-6 text-center md:pt-0 pt-10">
                          <h1 className="text-[20px]">
                            {data.quota} remaining | {data.total_used} used
                          </h1>
                          <div className="flex md:justify-end gap-2 justify-center">
                            <h1
                              onClick={() => {
                                setSelectedPromoId(data.id);
                                setShowEditModal(true);
                              }}
                              className="text-blue-600 hover:cursor-pointer hover:underline"
                            >
                              Edit
                            </h1>
                            <h1>|</h1>
                            <h1
                              onClick={() => {
                                duplicatePromo(data.id);
                              }}
                              className="text-blue-600 hover:cursor-pointer hover:underline"
                            >
                              Duplicate
                            </h1>
                            <h1>|</h1>
                            <h1
                              onClick={() => {
                                setSelectedPromoId(data.id);
                                setShowDeleteModal(true);
                              }}
                              className="text-blue-600 hover:cursor-pointer hover:underline"
                            >
                              Delete
                            </h1>
                          </div>
                          <h1
                            onClick={() => {
                              setSelectedPromoId(data.id);
                              setShowDetailModal(true);
                            }}
                            className="text-orange-600 hover:cursor-pointer hover:underline"
                          >
                            View Promotion Detail
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center py-10">
                  <Pagination
                    data={promotionData.pagination}
                    onNavigate={(navPage) => setPage(navPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerAdminHome;
