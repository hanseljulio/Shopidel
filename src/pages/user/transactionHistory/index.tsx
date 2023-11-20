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
import CheckoutGrandTotal from "@/components/CheckoutGrandTotal";
import Button from "@/components/Button";
import { IAPIResponse } from "@/interfaces/api_interface";

interface IIndividualOrderProps {
  data: ITransactionHistoryData;
  setCurrentTransaction: (transactionId: number) => void;
  setCurrentReview: (review: ITransactionHistoryReview) => void;
  setProductReviewId: (id: number, name: string) => void;
  confirmReceive: () => void;
}

interface IDetailModalProps {
  id: number;
}

interface IReviewModal {
  review: ITransactionHistoryReview;
}

interface IAddReviewModal {
  id: number;
  name: string;
  orderId: number;
  successSubmitFunction: () => void;
}

interface IConfirmReceiveModal {
  exitFunction: () => void;
}

const AddReviewModal = (props: IAddReviewModal) => {
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { updateUser } = useUserStore();

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_id", props.id.toString());
    formData.append("feedback", review);
    formData.append("rating", rating);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      toast.promise(
        API.post(`orders/${props.id}/add-review`, formData),
        {
          pending: "Posting review",
          success: {
            render() {
              props.successSubmitFunction();
              return "Review successfully posted!";
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
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[750px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Review Order</h1>
      </div>
      <h1 className="pt-3">
        Product name: <span className="font-bold">{props.name}</span>
      </h1>
      <div className="pt-4">
        <div className="flex justify-between">
          <p className="pb-2">Your review (max 500 characters!)</p>
          <p
            className={`${
              review.length > 500 || review.length === 0 ? "text-red-600" : ""
            } `}
          >
            {review.length}
          </p>
        </div>
        <textarea
          className="w-full h-80"
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <div className="pt-6 flex md:justify-between items-center py-6 md:flex-row flex-col md:gap-0 gap-6">
        <div className="flex items-center gap-6">
          <p className="font-bold">Rating (out of 5): </p>
          <select
            onChange={(e) => setRating(e.target.value)}
            className={`p-4 w-[100px] h-14 rounded`}
            name="category-dropdown"
          >
            <option disabled selected></option>
            <option value={1}>{"1"}</option>
            <option value={2}>{"2"}</option>
            <option value={3}>{"3"}</option>
            <option value={4}>{"4"}</option>
            <option value={5}>{"5"}</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload your picture here:</p>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="pt-8 flex justify-center">
        <Button
          text="Submit Review"
          onClick={submit}
          styling="bg-[#fddf97] p-3 rounded-[8px] w-[250px] my-4"
          disabled={review.length > 500 || rating === "" || review.length === 0}
        />
      </div>
    </div>
  );
};

const DetailModal = (props: IDetailModalProps) => {
  const [data, setData] = useState<ITransactionHistoryData>({
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
  const router = useRouter();
  const { updateUser } = useUserStore();

  const getDetail = async () => {
    try {
      const response = await API.get(`orders/${props.id}`);
      const data = await response.data.data;
      setData(data);
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
    getDetail();
  }, []);

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < data.products.length; i++) {
      total +=
        data.products[i].quantity * parseInt(data.products[i].individual_price);
    }

    return total;
  };

  return (
    <div className="bg-white p-5 rounded-md  md:w-[1000px] md:max-h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Transaction Details</h1>
      </div>
      <div className="pt-4">
        <h1>
          Order status: <span className="font-bold">{data.status}</span>
        </h1>
        <h1>
          Purchased from: <span className="font-bold">{data.shop_name}</span>
        </h1>
        <h1>
          Payment method: <span className="font-bold">My Wallet</span>
        </h1>
      </div>
      <div className="pt-8">
        <h1 className="text-[20px] font-bold flex items-center gap-3">
          <FaMapMarkerAlt className="text-[#ff3224]" />
          Delivery Address
        </h1>
        <h1>{data.shipping.detail}</h1>
        <h1>{`${data.shipping.kelurahan.toUpperCase()}, ${data.shipping.sub_district.toUpperCase()}, ${data.shipping.district.toUpperCase()}, ${data.shipping.province.toUpperCase()}, ID ${
          data.shipping.zip_code
        }`}</h1>
      </div>

      <div className="py-8">
        <h1 className="text-[20px] font-bold flex items-center gap-3">
          <FaTag className="text-[#ff3224]" />
          Products purchased
        </h1>
        {data.products.map((data, index) => {
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
      <CheckoutGrandTotal
        merchandise={getTotal()}
        shipping={
          isNaN(parseInt(data.delivery_fee)) ? 0 : parseInt(data.delivery_fee)
        }
        voucher={
          isNaN(parseInt(data.promotions.shop_voucher))
            ? 0
            : parseInt(data.promotions.shop_voucher)
        }
        marketplace={
          isNaN(parseInt(data.promotions.marketplace_voucher))
            ? 0
            : parseInt(data.promotions.marketplace_voucher)
        }
        total={
          isNaN(parseInt(data.total_payment)) ? 0 : parseInt(data.total_payment)
        }
      />
    </div>
  );
};

const ReviewModal = (props: IReviewModal) => {
  const [imageFile, setImageFile] = useState<File>();
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

  const getImageData = async () => {
    if (props.review.review_image_url) {
      let imageData = await getFile(props.review.review_image_url);
      setImageFile(imageData);
    }
  };

  useEffect(() => {
    getImageData();
  }, []);

  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:max-h-[600px] max-h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Your Review</h1>
      </div>
      <div className="pt-4">
        <h1>{props.review.review_feedback}</h1>
      </div>
      <div
        className={`pt-4 ${
          !props.review.review_image_url ? "hidden invisible" : ""
        }`}
      >
        <h1 className="font-bold">Here&apos;s the photo you uploaded:</h1>
        <img
          src={imageFile ? URL.createObjectURL(imageFile) : ""}
          alt="Your photo"
          className="h-[200px]"
        />
      </div>
      <div className="pt-10">
        <h1 className="text-[20px] font-bold">Additional Information</h1>
        <h1>Rating: {props.review.review_rating}/5</h1>
        <h1>
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

        <h1 className="text-[28px]">
          {currencyConverter(parseInt(props.data.total_payment))}
        </h1>
      </div>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="">
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
                        onClick={() =>
                          props.setProductReviewId(
                            parseInt(data.product_order_detail_id),
                            data.product_name
                          )
                        }
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
        <div className="md:text-right flex flex-col gap-3 text-[18px] text-center justify-end">
          <h1
            onClick={() => props.setCurrentTransaction(props.data.order_id)}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            View Transaction Detail
          </h1>
          <h1 className="">Status: {props.data.status.toUpperCase()}</h1>
          {props.data.status === "Delivered" && (
            <Button
              onClick={props.confirmReceive}
              text="I have received the order"
              styling="bg-[#364968] p-3 rounded-[8px] w-[250px] text-white "
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ConfirmReceiveModal = (props: IConfirmReceiveModal) => {
  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:max-h-[600px] max-h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Confirm Receipt</h1>
      </div>
      <div className="pt-4">
        <h1>
          By clicking confirm, you acknowledge that you have received the
          product.
        </h1>
        <h1>
          The seller will receive your money and this order will be marked as
          complete.
        </h1>
      </div>
      <div className="flex justify-center pt-8">
        <Button
          text="CONFIRM"
          styling="bg-[#364968] p-3 rounded-[8px] w-[250px] text-white "
        />
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
    "Canceled",
  ];
  const [page, setPage] = useState<number>(1);
  const [selectedReview, setSelectedReview] =
    useState<ITransactionHistoryReview>({
      review_id: 0,
      review_feedback: "",
      review_rating: 0,
      review_image_url: "",
      created_at: "0001-01-01T00:00:00Z",
    });
  const [selectedTransactionId, setSelectedTransactionId] = useState<number>(0);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<number>(0);

  const [showConfirmReceive, setShowConfirmReceive] = useState<boolean>(false);

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

  const reviewSubmitFunction = () => {
    setShowAddReviewModal(false);
    getTransactionData();
  };

  useEffect(() => {
    getTransactionData();
  }, [sortBy, page]);

  return (
    <>
      {showConfirmReceive && (
        <Modal
          content={
            <ConfirmReceiveModal
              exitFunction={() => {
                setShowConfirmReceive(false);
                getTransactionData();
              }}
            />
          }
          onClose={() => setShowConfirmReceive(false)}
        />
      )}

      {showAddReviewModal && (
        <Modal
          content={
            <AddReviewModal
              id={selectedProductId}
              orderId={selectedOrderId}
              name={selectedProductName}
              successSubmitFunction={reviewSubmitFunction}
            />
          }
          onClose={() => setShowAddReviewModal(false)}
        />
      )}

      {showDetailModal && (
        <Modal
          content={<DetailModal id={selectedTransactionId} />}
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
                      setCurrentTransaction={(id) => {
                        setSelectedTransactionId(id);
                        setShowDetailModal(true);
                      }}
                      setCurrentReview={(review) => {
                        setSelectedReview(review);
                        setShowReviewModal(true);
                      }}
                      setProductReviewId={(id, name) => {
                        setSelectedOrderId(data.order_id);
                        setSelectedProductId(id);
                        setSelectedProductName(name);
                        setShowAddReviewModal(true);
                      }}
                      confirmReceive={() => setShowConfirmReceive(true)}
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
