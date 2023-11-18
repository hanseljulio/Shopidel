import React, { useEffect, useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { currencyConverter } from "@/utils/utils";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/Modal";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { API } from "@/network";
import axios from "axios";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAPIResponse } from "@/interfaces/api_interface";
import {
  ISellerOrderHistory,
  ISellerOrderHistoryData,
} from "@/interfaces/seller_interface";
import Pagination from "@/components/Pagination";

interface IIndividualOrderProps {
  setCancelTransaction: (orderId: number) => void;
  data: ISellerOrderHistoryData;
  setOrderDetail: () => void;
  refreshFunction: () => void;
}

interface IOrderDetailModalProps {
  data: ISellerOrderHistoryData;
}

const OrderDetailModal = (props: IOrderDetailModalProps) => {
  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Order Details</h1>
      </div>
      <div className="pt-4">
        <h1>
          Status:{" "}
          <span className="font-bold">{props.data.status.toUpperCase()}</span>
        </h1>
        <h1>Order Number: {props.data.order_id}</h1>
        <h1>Buyer: {props.data.buter_name}</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-[20px]">Delivery Service</h1>
        <h1>Courier: JNE</h1>
        <h1>Estimated Time: 2-3 days</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-[20px]">Payment Information</h1>
        <h1>
          Order Total: {currencyConverter(parseInt(props.data.total_payment))}
        </h1>
        <h1>Shipping total: {currencyConverter(10000)}</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-[20px]">Delivery Address</h1>
        {/* <h1>{props.data.shipping.detail}</h1>
        <h1>{`${props.data.shipping.kelurahan.toUpperCase()}, ${props.data.shipping.sub_district.toUpperCase()}, ${props.data.shipping.district.toUpperCase()}, ${props.data.shipping.province.toUpperCase()}, ID ${
          props.data.shipping.zip_code
        }`}</h1> */}
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-[20px]">Purchased Products:</h1>
        {props.data.products.map((product, index) => {
          return (
            <div key={index} className="py-2">
              <h1 className="font-bold">{product.product_name}</h1>

              <p>
                {product.quantity} item x{" "}
                {currencyConverter(parseInt(product.individual_price))}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ICancelOrderModal {
  orderId: number;
  exitFunction: () => void;
}

const CancelOrderModal = (props: ICancelOrderModal) => {
  const router = useRouter();
  const { updateUser } = useUserStore();

  const [message, setMessage] = useState<string>("");

  const submit = async (e: any) => {
    e.preventDefault();

    const sendData = {
      notes: message,
    };

    try {
      toast.promise(
        API.put(`sellers/orders/${props.orderId}/cancel`, sendData),
        {
          pending: "Cancelling order",
          success: {
            render() {
              props.exitFunction();
              return "Order has been cancelled";
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
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[600px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Cancel Order</h1>
      </div>

      <div className="pt-4">
        <p className="pb-4">
          Please write a message explaining your cancellation (at least 50
          characters).
        </p>
        <textarea
          className="w-full h-80"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <p className="text-center text-red-600 py-2">
        WARNING: Once cancelled, the order cannot be restored.
      </p>
      <div className=" flex justify-center">
        <Button
          text="Cancel Order"
          onClick={submit}
          styling="bg-red-600 text-white p-3 rounded-[8px] w-[250px] my-4"
          disabled={message.length < 50}
        />
      </div>
    </div>
  );
};

// Update order status here - On Delivery
// Process order here - receive or cancel. If you cancel you need to give a note

const IndividualOrder = (props: IIndividualOrderProps) => {
  const processOrder = async (orderId: number) => {
    try {
      toast.promise(
        API.put(`sellers/orders/${orderId}/processed`),
        {
          pending: "Processing order",
          success: {
            render() {
              props.refreshFunction();
              return "Order has been processed";
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
    <div className="p-5 rounded-md md:w-[90%] border-2 border-black w-[80%]">
      <div className="pb-3 flex justify-between">
        <h1 className="text-[20px] ">{props.data.buter_name}</h1>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:text-right flex flex-col gap-3 text-[18px] text-center">
          <h1
            onClick={props.setOrderDetail}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            View Order Detail
          </h1>
          {props.data.status !== "On Process" &&
          props.data.status !== "Canceled" ? (
            <div className="flex items-center gap-4">
              <div
                className={`flex gap-4 ${
                  props.data.status === "Completed" ? "hidden invisible" : ""
                }`}
              >
                <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
                  Print Shipping Label
                </h1>
                <h1>|</h1>
              </div>
              <h1>Status: {props.data.status}</h1>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <h1
                onClick={() => {
                  processOrder(props.data.order_id);
                }}
                className="text-orange-400 hover:cursor-pointer hover:underline"
              >
                PROCESS ORDER
              </h1>
              <h1>|</h1>
              <h1
                onClick={() => props.setCancelTransaction(props.data.order_id)}
                className="text-red-600 hover:cursor-pointer hover:underline"
              >
                CANCEL ORDER
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SellerOrderListPage = () => {
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = [
    "All",
    "On Process",
    "Delivered",
    "Completed",
    "Canceled",
  ];
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<ISellerOrderHistory>();
  const [page, setPage] = useState<number>(1);
  const [cancelOrderId, setCancelOrderId] = useState<number>(0);
  const [selectedOrderData, setSelectedOrderData] =
    useState<ISellerOrderHistoryData>({
      order_id: 0,
      buter_name: "",
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
      created_at: "",
    });

  // console.log(orderData?.data);

  const router = useRouter();
  const { updateUser } = useUserStore();

  const getOrderData = async () => {
    try {
      const response = await API.get(
        `sellers/orders?limit=10&status=${sortBy}&page=${page}`
      );
      const data = await response.data;
      setOrderData(data);
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
    getOrderData();
  }, [page]);

  return (
    <>
      {showDetailModal && (
        <Modal
          content={<OrderDetailModal data={selectedOrderData} />}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showCancelModal && (
        <Modal
          content={
            <CancelOrderModal
              orderId={cancelOrderId}
              exitFunction={() => setShowCancelModal(false)}
            />
          }
          onClose={() => setShowCancelModal(false)}
        />
      )}

      <SellerAdminLayout currentPage="List of Orders">
        <ToastContainer />
        <div className="w-full mx-auto mt-6">
          <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
            <h1 className="text-[30px]">List of Orders</h1>
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
          {!orderData || orderData.data.length === 0 ? (
            <h1 className="text-center pt-[80px] font-bold text-[25px]">
              Nothing to see here!
            </h1>
          ) : (
            <div>
              <div className="pt-6 flex flex-col items-center gap-8">
                {orderData?.data.map((data, index) => (
                  <IndividualOrder
                    key={index}
                    refreshFunction={getOrderData}
                    setCancelTransaction={(orderId) => {
                      setCancelOrderId(orderId);
                      setShowCancelModal(true);
                    }}
                    setOrderDetail={() => {
                      setSelectedOrderData(data);
                      setShowDetailModal(true);
                    }}
                    data={data}
                  />
                ))}
              </div>
              <div className="flex justify-center py-10">
                <Pagination
                  data={orderData?.pagination}
                  onNavigate={(navPage) => setPage(navPage)}
                />
              </div>
            </div>
          )}
          {/* <div className="pt-6 flex flex-col items-center gap-8">
            <IndividualOrder
              setCancelTransaction={() => setShowCancelModal(true)}
              setOrderDetail={() => setShowDetailModal(true)}
            />
          </div> */}
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerOrderListPage;
