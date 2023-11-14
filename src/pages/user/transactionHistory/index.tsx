import ProfileLayout from "@/components/ProfileLayout";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API } from "@/network";
import axios from "axios";
import { clientUnauthorizeHandler, currencyConverter } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ITransactionHistoryData,
  ITransactionHistory,
} from "@/interfaces/user_interface";

interface IIndividualOrderProps {
  data: ITransactionHistoryData;
}

const IndividualOrder = (props: IIndividualOrderProps) => {
  return (
    <div className="p-5 rounded-md md:w-[90%] border-2 border-black">
      <div className="pb-3 flex justify-between">
        <h1 className="text-[20px] ">{props.data.shop_name}</h1>
        <h1 className="text-[20px] ">
          {currencyConverter(parseInt(props.data.total_payment))}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <div>
          {props.data.products.map((data, index) => {
            return (
              <div key={index} className="py-3 flex justify-between">
                <div>
                  <h1 className="font-bold">{data.product_name}</h1>
                  <div>
                    <p>
                      {data.quantity} item x{" "}
                      {currencyConverter(parseInt(data.individual_price))}
                    </p>
                    {data.is_reviewed ? (
                      <p className="text-green-600 hover:cursor-pointer">
                        View Review
                      </p>
                    ) : (
                      <p className="text-red-600 hover:cursor-pointer">
                        Review Order
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-right flex flex-col gap-3 text-[18px]">
          <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
            View Transaction Detail
          </h1>
        </div>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  const { user, updateUser } = useUserStore();
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<
    ITransactionHistoryData[]
  >([]);
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = [
    "All",
    "On Process",
    "Delivered",
    "Completed",
    "Cancelled",
  ];

  // console.log(transactionData);

  const getTransactionData = async () => {
    try {
      const response = await API.get(`/orders/histories?status=${sortBy}`);
      setTransactionData(response.data.data);
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
    getTransactionData();
  }, [sortBy]);

  return (
    <div>
      <ProfileLayout currentPage="Transaction History">
        <ToastContainer />
        <div className="w-full mx-auto mt-6 ">
          <div className="flex items-center justify-between md:flex-row md:pl-[76px] md:pr-[80px] flex-col p-0 md:gap-0 gap-8">
            <h1 className="text-[30px]">Transaction History</h1>
            <div className="flex items-center gap-6">
              <p>Sort By</p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className={`p-4 w-[200px] rounded`}
                name="category-dropdown"
              >
                {orderStatus.map((option, index) => (
                  <option
                    key={index}
                    value={option.replace(/\s+/g, "").toLowerCase()}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-6 flex flex-col items-center gap-8">
            {transactionData.map((data, index) => (
              <IndividualOrder key={index} data={data} />
            ))}
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default TransactionHistory;
