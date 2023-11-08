import React from "react";
import { FaWallet } from "react-icons/fa";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutPaymentProps {
  money: number;
  canPay: boolean;
}

const CheckoutPayment = (props: ICheckoutPaymentProps) => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4 items-center mobile:flex-col mobile:gap-5">
      <h1 className="flex items-center gap-3">
        <FaWallet className=" text-amber-700" />
        My Wallet
      </h1>
      <span
        className={`text-red-600 ${props.canPay ? "hidden invisible" : ""}`}
      >
        INSUFFICIENT FUNDS
      </span>
      <h1
        className={`text-[20px] ${
          props.canPay ? "text-blue-600" : "text-red-600"
        } font-bold`}
      >
        {currencyConverter(props.money)}
      </h1>
    </div>
  );
};

export default CheckoutPayment;
