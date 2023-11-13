import React from "react";
import { FaTicketAlt } from "react-icons/fa";

interface CheckoutVoucherSelectProps {
  usedVoucher: number;
  modalOn: () => void;
}

const CheckoutVoucherSelect = (props: CheckoutVoucherSelectProps) => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4 items-center md:flex-row flex-col gap-6">
      <h1 className="flex items-center gap-3">
        <FaTicketAlt className="text-[#e09664]" />
        Promotions
      </h1>
      <span
        className={`text-[#bb5d1f] ${
          props.usedVoucher === 0 ? "hidden invisible" : ""
        }`}
      >
        Used: {props.usedVoucher}
      </span>
      <h1
        onClick={props.modalOn}
        className="text-[18px] text-blue-600 hover:cursor-pointer hover:underline"
      >
        Select Promotion
      </h1>
    </div>
  );
};

export default CheckoutVoucherSelect;
