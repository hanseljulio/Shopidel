import React from "react";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutGrandTotalProps {
  merchandise: number;
  shipping: number;
  voucher: number;
}

const CheckoutGrandTotal = (props: ICheckoutGrandTotalProps) => {
  return (
    <div className="bg-[#29374e] text-right px-[20px] py-6 text-white flex items-center justify-end gap-10">
      <div className="text-left h-[150px]">
        <h1>Merchandise Total: </h1>
        <h1>Shipping Total: </h1>
        {props.voucher > 0 && <h1>Voucher Total: </h1>}
        <br />
        <h1 className="pt-3">Total payment: </h1>
      </div>

      <div className="text-right h-[150px]">
        <h1>{currencyConverter(props.merchandise)}</h1>
        <h1>{currencyConverter(props.shipping)}</h1>
        {props.voucher > 0 && <h1>{currencyConverter(props.voucher)}</h1>}
        <br />
        <h1 className="text-[30px]">
          {currencyConverter(
            props.merchandise + props.shipping - props.voucher
          )}
        </h1>
      </div>
    </div>
  );
};

export default CheckoutGrandTotal;
