import React from "react";
import Input from "../Input";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutShippingSelect {
  onChange: (e: any) => void;
  shippingOption: string;
  shippingTotal: number;
}

const CheckoutShippingSelect = (props: ICheckoutShippingSelect) => {
  return (
    <div className="text-[20px] flex justify-between border-x-2 mobile:flex-col mobile:pt-6">
      <div className="basis-[40%] py-4 pl-6 border-r-2 mobile:p-0 mobile:flex mobile:justify-center mobile:border-none">
        <Input
          label="Notes:"
          labelStyle="pt-2"
          styling="flex mobile:flex-col items-center gap-3 text-[16px]"
          type="text"
          name="orderMessage"
          placeholder="Write additional notes here"
          width="w-[350px] mobile:w-[300px]"
          onChange={props.onChange}
        />
      </div>
      <div className="mobile:flex-col mobile:gap-4 flex text-[16px] items-center justify-between px-[21px] basis-[60%] mobile:py-8">
        <h1 className="text-emerald-500">Shipping option:</h1>
        <h1>{props.shippingOption}</h1>
        <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
          CHANGE{" "}
          <span className="hidden invisible mobile:visible mobile:inline">
            SHIPPING
          </span>
        </h1>
        <h1>
          <span className="hidden invisible mobile:visible mobile:inline">
            Shipping price:{" "}
          </span>
          {currencyConverter(props.shippingTotal)}
        </h1>
      </div>
    </div>
  );
};

export default CheckoutShippingSelect;
