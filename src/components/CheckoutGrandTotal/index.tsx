import React from "react";
import { currencyConverter } from "@/utils/utils";

interface ICheckoutGrandTotalProps {
  merchandise: number;
  shipping: number;
  voucher: number;
  marketplace: number;
  total?: number;
}

const CheckoutGrandTotal = (props: ICheckoutGrandTotalProps) => {
  return (
    <>
      <div className="bg-[#29374e] text-right px-[20px] py-16 text-white md:flex items-center md:justify-end gap-10 hidden md:visible invisible md:text-[18px] text-[14px] justify-center ">
        <div className="text-left h-[150px]">
          <h1>Order Total: </h1>
          <h1>Shipping Total: </h1>
          {props.voucher > 0 && <h1>Shop promo: </h1>}
          {props.marketplace > 0 && <h1>Marketplace Promo: </h1>}
          <br />
          <h1 className="pt-3">Total payment: </h1>
        </div>

        <div className="text-right h-[150px]">
          <h1>{currencyConverter(props.merchandise)}</h1>
          <h1>{currencyConverter(props.shipping)}</h1>
          {props.voucher > 0 && <h1>{currencyConverter(props.voucher)}</h1>}
          {props.marketplace > 0 && (
            <h1>{currencyConverter(props.marketplace)}</h1>
          )}
          <br />
          <h1 className="text-[30px]">
            {currencyConverter(
              props.merchandise +
                props.shipping -
                props.voucher -
                props.marketplace
            )}
          </h1>
        </div>
      </div>
      <div className="bg-[#29374e] text-left px-[40px] py-6 text-white flex md:hidden md:invisible visible md:text-[18px] text-[14px]  ">
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
            {props.voucher > 0 && <h1>Promo Total: </h1>}
            {props.voucher > 0 && <h1>{currencyConverter(props.voucher)}</h1>}
          </div>

          <div className="text-right w-full">
            <h1 className="pt-3">Total payment: </h1>
            <h1 className="text-[30px]">
              {currencyConverter(
                props.total
                  ? props.total
                  : props.merchandise +
                      props.shipping -
                      props.voucher -
                      props.marketplace
              )}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutGrandTotal;
