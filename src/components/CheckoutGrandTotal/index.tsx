import React from "react";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutGrandTotalProps {
  merchandise: number;
  shipping: number;
  voucher: number;
}

const CheckoutGrandTotal = (props: ICheckoutGrandTotalProps) => {
  return (
    <>
      <div className="bg-[#29374e] text-right px-[20px] py-6 text-white flex items-center justify-end gap-10 mobile:hidden mobile:invisible mobile:text-[14px] mobile:justify-center ">
        <div className="text-left h-[150px]">
          <h1>Order Total: </h1>
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
      <div className="bg-[#29374e] text-left px-[40px] py-6 text-white mobile:flex hidden invisible mobile:visible mobile:text-[14px]  ">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex justify-between">
            <h1>Order Total: </h1>
            <h1>{currencyConverter(props.merchandise)}</h1>
          </div>

          <div className="flex justify-between">
            <h1>Shipping Total: </h1>
            <h1>{currencyConverter(props.shipping)}</h1>
          </div>

          <div className="flex justify-between">
            {props.voucher > 0 && <h1>Voucher Total: </h1>}
            {props.voucher > 0 && <h1>{currencyConverter(props.voucher)}</h1>}
          </div>

          <div className="text-right w-full">
            <h1 className="pt-3">Total payment: </h1>
            <h1 className="text-[30px]">
              {currencyConverter(
                props.merchandise + props.shipping - props.voucher
              )}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutGrandTotal;
