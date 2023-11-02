import React from "react";
import Input from "../Input";
import { currencyConverter } from "@/utils/utils";

const CheckoutShippingSelect = () => {
  return (
    <div className="text-[20px] flex justify-between border-x-2">
      <div className="basis-[40%] py-4 pl-6 border-r-2">
        <Input
          label="Notes:"
          labelStyle="pt-2"
          styling="flex items-center gap-3 text-[16px]"
          type="text"
          name="orderMessage"
          placeholder="Write additional notes here"
          width="w-[350px]"
        />
      </div>
      <div className="flex text-[16px] items-center justify-between px-[21px] basis-[60%]">
        <h1 className="text-emerald-500">Shipping option:</h1>
        <h1>Regular</h1>
        <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
          CHANGE
        </h1>
        <h1>{currencyConverter(9000)}</h1>
      </div>
    </div>
  );
};

export default CheckoutShippingSelect;
