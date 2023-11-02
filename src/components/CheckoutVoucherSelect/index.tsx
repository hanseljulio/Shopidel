import React from "react";
import { FaTicketAlt } from "react-icons/fa";

const CheckoutVoucherSelect = () => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4">
      <h1 className="flex items-center gap-3">
        <FaTicketAlt className="text-[#e09664]" />
        Voucher
      </h1>
      <h1 className="text-[18px] text-blue-600 hover:cursor-pointer hover:underline">
        Select Voucher
      </h1>
    </div>
  );
};

export default CheckoutVoucherSelect;
