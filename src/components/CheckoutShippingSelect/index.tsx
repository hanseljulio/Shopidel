import React from "react";
import Input from "../Input";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutShippingSelect {
  onChange: (e: any) => void;
  shippingOption: string;
  shippingTotal: number;
  openShippingModal: () => void;
}

const CheckoutShippingSelect = (props: ICheckoutShippingSelect) => {
  return (
    <div className="text-[20px] flex justify-between border-x-2 md:flex-row md:pt-0 flex-col pt-6">
      <div className="basis-[40%] md:py-4 md:pl-6 md:border-r-2 p-0 md:block md:justify-normal flex justify-center border-none">
        <Input
          label="Notes:"
          labelStyle="pt-2"
          styling="flex md:flex-row flex-col items-center gap-3 text-[16px]"
          type="text"
          name="orderMessage"
          placeholder="Write additional notes here"
          width="md:w-[350px] w-[300px]"
          onChange={props.onChange}
        />
      </div>
      <div className="flex-col gap-4 flex md:flex-row md:gap-0 text-[16px] items-center justify-between px-[21px] basis-[60%] py-8 md:py-0">
        <h1 className="text-emerald-500">Shipping option:</h1>
        <h1>{props.shippingOption}</h1>
        <h1
          onClick={props.openShippingModal}
          className="text-blue-600 hover:cursor-pointer hover:underline"
        >
          CHANGE{" "}
          <span className="md:hidden md:invisible visible inline">
            SHIPPING
          </span>
        </h1>
        <h1>
          <span className="md:hidden md:invisible visible inline">
            Shipping price:{" "}
          </span>
          {currencyConverter(props.shippingTotal)}
        </h1>
      </div>
    </div>
  );
};

export default CheckoutShippingSelect;
