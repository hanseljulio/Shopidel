import React, { useState } from "react";
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

interface IIndividualOrderProps {
  setCancelTransaction: () => void;
  setOrderDetail: () => void;
}

const OrderDetailModal = () => {
  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Order Details</h1>
      </div>
      <div className="pt-4">
        <h1>Status: ON PROCESS</h1>
        <h1>Order Number: {Math.floor(Math.random() * 10000000000)}</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold">Delivery Service</h1>
        <h1>Courier: JNE</h1>
        <h1>Estimated Time: 2-3 days</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold">Payment Information</h1>
        <h1>Grand Total: {currencyConverter(300000)}</h1>
        <h1>Order total: {currencyConverter(200000)}</h1>
        <h1>Shipping total: {currencyConverter(10000)}</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold">Delivery Address</h1>
        <h1>Sopo Del Tower</h1>
        <h1>SUKAPURA, BOJONGSOANG, KABUPATEN BANDUNG, JAWA BARAT, ID 40851</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold">Purchased Products:</h1>
        <div>
          <h1 className="font-bold">
            Kalung 100% Titanium Rollo + Cincin Pria Dan wanita [ Toko Metal ]
          </h1>

          <p>2 item x {currencyConverter(150000)}</p>
        </div>
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
  const [receiveTest, setReceieveTest] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number>(5);

  const processOrder = async () => {
    try {
      toast.promise(
        API.put(`sellers/orders/${selectedOrderId}/processed`),
        {
          pending: "Processing order",
          success: "Order has been processed",
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
        <h1 className="text-[20px] ">Buyer name</h1>
        <h1 className="text-[20px] ">{currencyConverter(300000)}</h1>
      </div>
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="py-3 flex justify-between">
          <div>
            <h1 className="font-bold">Product name here</h1>
            <div>
              <p>
                {2} item x {currencyConverter(150000)}
              </p>
            </div>
          </div>
        </div>
        <div className="md:text-right flex flex-col gap-3 text-[18px] text-center">
          <h1
            onClick={props.setOrderDetail}
            className="text-blue-600 hover:cursor-pointer hover:underline"
          >
            View Order Detail
          </h1>
          {receiveTest ? (
            <div className="flex items-center gap-4">
              <div className={`flex gap-4`}>
                <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
                  Print Shipping Label
                </h1>
                <h1>|</h1>
              </div>
              <h1>Status: DELIVERED</h1>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <h1
                onClick={() => {
                  setReceieveTest(true);
                  processOrder();
                }}
                className="text-orange-400 hover:cursor-pointer hover:underline"
              >
                PROCESS ORDER
              </h1>
              <h1>|</h1>
              <h1
                onClick={props.setCancelTransaction}
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
  const orderStatus = ["All", "Needs Processing", "Canceled"];
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  return (
    <>
      {showDetailModal && (
        <Modal
          content={<OrderDetailModal />}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showCancelModal && (
        <Modal
          content={
            <CancelOrderModal
              orderId={1}
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
          <div className="pt-6 flex flex-col items-center gap-8">
            <IndividualOrder
              setCancelTransaction={() => setShowCancelModal(true)}
              setOrderDetail={() => setShowDetailModal(true)}
            />
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerOrderListPage;
