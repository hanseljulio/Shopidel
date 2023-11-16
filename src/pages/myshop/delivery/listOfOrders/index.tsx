import React, { useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { currencyConverter } from "@/utils/utils";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/Modal";

interface IIndividualOrderProps {
  setCancelTransaction: () => void;
}

const CancelOrderModal = () => {
  const router = useRouter();
  const { updateUser } = useUserStore();

  const [message, setMessage] = useState<string>("");

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

      <div className="pt-8 flex justify-center">
        <Button
          text="Cancel Order"
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
          <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
            View Order Detail
          </h1>
          <div className="flex items-center gap-4">
            <h1 className="text-orange-400 hover:cursor-pointer hover:underline">
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
        </div>
      </div>
    </div>
  );
};

const SellerOrderListPage = () => {
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = ["All", "Needs Processing", "Canceled"];
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  return (
    <>
      {showCancelModal && (
        <Modal
          content={<CancelOrderModal />}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      <SellerAdminLayout currentPage="List of Orders">
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
            />
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerOrderListPage;
