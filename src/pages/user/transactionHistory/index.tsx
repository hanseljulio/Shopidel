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
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";

interface IIndividualOrderProps {
  data: ITransactionHistoryData;
  setCurrentTransaction: (transaction: ITransactionHistoryData) => void;
  setCurrentReview: (review: ITransactionHistoryReview) => void;
}

interface IDetailModalProps {
  data: ITransactionHistoryData;
}

interface IReviewModal {
  review: ITransactionHistoryReview;
}

const DetailModal = (props: IDetailModalProps) => {
  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < props.data.products.length; i++) {
      total +=
        props.data.products[i].quantity *
        parseInt(props.data.products[i].individual_price);
    }

    return total;
  };

  return (
    <div className="bg-white p-5 rounded-md  md:w-[1000px] max-h-[800px] w-[99%] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Transaction Details</h1>
      </div>
      <div className="pt-4">
        <h1>Order status: {props.data.status}</h1>
        <h1>Purchased from: {props.data.shop_name}</h1>
      </div>
      <div className="pt-8">
        <h1 className="text-[20px] font-bold flex items-center gap-3">
          <FaMapMarkerAlt className="text-[#ff3224]" />
          Delivery Address
        </h1>
        <h1>{props.data.shipping.detail}</h1>
        <h1>{`${props.data.shipping.kelurahan.toUpperCase()}, ${props.data.shipping.sub_district.toUpperCase()}, ${props.data.shipping.district.toUpperCase()}, ${props.data.shipping.province.toUpperCase()}, ID ${
          props.data.shipping.zip_code
        }`}</h1>
      </div>

      <div className="py-8">
        <h1 className="text-[20px] font-bold flex items-center gap-3">
          <FaTag className="text-[#ff3224]" />
          Products purchased
        </h1>
        {props.data.products.map((data, index) => {
          return (
            <div key={index} className="py-3">
              <h1 className="font-bold">{data.product_name}</h1>

              <p>
                {data.quantity} item x{" "}
                {currencyConverter(parseInt(data.individual_price))}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end py-10 px-4 bg-[#29374e] text-white">
        <div className="text-left h-[150px]">
          <h1>Order Total: </h1>
          <h1>Shipping Total: </h1>
          {parseInt(props.data.promotions.shop_voucher) > 0 && (
            <h1>Shop Promo: </h1>
          )}
          {parseInt(props.data.promotions.marketplace_voucher) > 0 && (
            <h1>Marketplace Promo: </h1>
          )}
          <br />
          <h1 className="pt-3">Total payment: </h1>
        </div>

        <div className="text-right h-[150px]">
          <h1>{currencyConverter(getTotal())}</h1>
          <h1>{currencyConverter(parseInt(props.data.delivery_fee))}</h1>
          {parseInt(props.data.promotions.shop_voucher) > 0 && (
            <h1>
              {currencyConverter(parseInt(props.data.promotions.shop_voucher))}
            </h1>
          )}
          {parseInt(props.data.promotions.marketplace_voucher) > 0 && (
            <h1>
              {currencyConverter(
                parseInt(props.data.promotions.marketplace_voucher)
              )}
            </h1>
          )}
          <br />
          <h1 className="text-[30px]">
            {currencyConverter(parseInt(props.data.total_payment))}
          </h1>
        </div>
      </div>
    </div>
  );
};

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
                      <p
                        className={`${
                          props.data.status !== "Completed"
                            ? "hidden invisible"
                            : ""
                        } text-red-600 hover:cursor-pointer w-28`}
                      >
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
          <h1
            onClick={() => props.setCurrentTransaction(props.data)}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            View Transaction Detail
          </h1>
          <h1 className="">Status: {props.data.status.toUpperCase()}</h1>
        </div>
      </div>
    </div>
  );
};

const TransactionHistory = () => {
  const { user, updateUser } = useUserStore();
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<ITransactionHistory>({
    data: [
      {
        order_id: 3,
        shop_name: "Jejak Trendi",
        status: "Completed",
        products: [
          {
            product_id: 5,
            product_name:
              "KOMIN-Sandal Hiu Pria Dewasa Sendal Shark Sandal Couple Rumah Sendal Paus Eva Lembut Ringan Nyaman Sandal Pasangan Korea",
            quantity: 1,
            individual_price: "18000",
            review: {
              review_id: 0,
              review_feedback: "",
              review_rating: 0,
              created_at: "0001-01-01T00:00:00Z",
            },
            is_reviewed: false,
          },
        ],
        promotions: {
          marketplace_voucher: "9000",
          shop_voucher: "2000",
        },
        delivery_fee: "17000",
        shipping: {
          province: "Jabar",
          district: "Jakarta",
          zip_code: "52323",
          sub_district: "diejdiejdid",
          kelurahan: "aded",
          detail: "dededededed",
        },
        total_payment: "520000",
      },
    ],
    pagination: {
      total_page: 2,
      total_item: 13,
      current_page: 1,
      limit: 10,
    },
  });
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = [
    "All",
    "On Process",
    "Delivered",
    "Completed",
    "Canceled",
  ];
  const [page, setPage] = useState<number>(1);
  const [selectedReview, setSelectedReview] =
    useState<ITransactionHistoryReview>({
      review_id: 0,
      review_feedback: "",
      review_rating: 0,
      created_at: "0001-01-01T00:00:00Z",
    });
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransactionHistoryData>({
      order_id: 0,
      shop_name: "",
      status: "",
      products: [],
      promotions: {
        marketplace_voucher: "",
        shop_voucher: "",
      },
      delivery_fee: "",
      shipping: {
        province: "",
        district: "",
        zip_code: "",
        sub_district: "",
        kelurahan: "",
        detail: "",
      },
      total_payment: "",
    });
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

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
    // getTransactionData();
  }, [sortBy, page]);

  return (
    <>
      {showDetailModal && (
        <Modal
          content={<DetailModal data={selectedTransaction} />}
          onClose={() => setShowDetailModal(false)}
        />
      )}

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
                      setCurrentTransaction={(transaction) => {
                        setSelectedTransaction(transaction);
                        setShowDetailModal(true);
                      }}
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
