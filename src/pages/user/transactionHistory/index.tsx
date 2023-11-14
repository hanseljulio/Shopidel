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
  ITransactionHistoryReview,
} from "@/interfaces/user_interface";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";

interface IIndividualOrderProps {
  data: ITransactionHistoryData;
  setCurrentReview: (review: ITransactionHistoryReview) => void;
}

interface IReviewModal {
  review: ITransactionHistoryReview;
}

const ReviewModal = (props: IReviewModal) => {
  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[280px] w-[99%]">
      <div className="px-5 pt-5 text-center">
        <h1 className="font-bold w-full">Your Review</h1>
        <h1 className="p-3">{props.review.review_feedback}</h1>
        <h1 className="p-3">Rating: {props.review.review_rating}/5</h1>
        <h1 className="p-3">
          Reviewed on: {new Date(props.review.created_at).toLocaleString()}
        </h1>
      </div>
    </div>
  );
};

const IndividualOrder = (props: IIndividualOrderProps) => {
  return (
    <div className="p-5 rounded-md md:w-[90%] border-2 border-black w-[80%]">
      <div className="pb-3 flex justify-between">
        <h1 className="text-[20px] ">{props.data.shop_name}</h1>
        <h1 className="text-[20px] ">
          {currencyConverter(parseInt(props.data.total_payment))}
        </h1>
      </div>
      <div className="flex justify-between items-center md:flex-row flex-col">
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
                      <div className="flex gap-x-2 group relative w-24">
                        <p
                          onClick={() => props.setCurrentReview(data.review)}
                          className="text-green-600 hover:cursor-pointer"
                        >
                          View Review
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-600 hover:cursor-pointer w-28">
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
  const [transactionData, setTransactionData] = useState<ITransactionHistory>();
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = [
    "All",
    "On Process",
    "Delivered",
    "Completed",
    "Cancelled",
  ];
  const [page, setPage] = useState<number>(1);
  const [selectedReview, setSelectedReview] =
    useState<ITransactionHistoryReview>({
      review_id: 0,
      review_feedback: "",
      review_rating: 0,
      created_at: "0001-01-01T00:00:00Z",
    });
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  const getTransactionData = async () => {
    try {
      const response = await API.get(
        `/orders/histories?status=${sortBy}&page=${page}`
      );
      const data = await response.data;
      setTransactionData(data);
      window.scrollTo(0, 0);
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
  }, [sortBy, page]);

  return (
    <>
      {showReviewModal && (
        <Modal
          content={<ReviewModal review={selectedReview} />}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      <div>
        <ProfileLayout currentPage="Transaction History">
          <ToastContainer />
          <div className="w-full mx-auto mt-6 ">
            <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
              <h1 className="text-[30px]">Transaction History</h1>
              <div className="flex items-center gap-6">
                <p>Sort By</p>
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`p-4 w-[200px] rounded`}
                  name="category-dropdown"
                >
                  {orderStatus.map((option, index) => (
                    <option key={index} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {!transactionData || transactionData.data.length === 0 ? (
              <h1 className="text-center pt-[80px] font-bold text-[25px]">
                Nothing to see here!
              </h1>
            ) : (
              <div>
                <div className="pt-6 flex flex-col items-center gap-8">
                  {transactionData?.data.map((data, index) => (
                    <IndividualOrder
                      key={index}
                      data={data}
                      setCurrentReview={(review) => {
                        setSelectedReview(review);
                        setShowReviewModal(true);
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-center py-10">
                  <Pagination
                    data={transactionData?.pagination}
                    onNavigate={(navPage) => setPage(navPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </ProfileLayout>
      </div>
    </>
  );
};

export default TransactionHistory;
