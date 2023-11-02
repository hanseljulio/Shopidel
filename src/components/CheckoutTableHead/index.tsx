import React from "react";

const CheckoutTableHead = () => {
  return (
    <tr className="border-2">
      <th className="px-[30px] py-[10px] text-left w-[250px] h-[65px]">
        Products Ordered
      </th>
      <th className="px-[20px] py-[10px] text-center w-[100px] h-[65px]">
        Unit Price
      </th>
      <th className="px-[20px] py-[10px] text-center w-[100px] h-[65px]">
        Amount
      </th>
      <th className="px-[20px] py-[10px] text-right w-[100px] h-[65px]">
        Item Subtotal
      </th>
    </tr>
  );
};

export default CheckoutTableHead;
