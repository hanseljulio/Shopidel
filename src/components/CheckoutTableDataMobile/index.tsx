import React from "react";
import CartProduct from "../CartProduct";
import { currencyConverter } from "@/utils/utils";
import QuantityButton from "../QuantityButton";
import Button from "../Button";

interface ICartTableDataProps {
  id: number;
  price: number;
  quantity: number;
  productName: string;
}

const CheckoutTableDataMobile = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-left">
        {
          <div>
            <div className="pb-4">
              <CartProduct productName={props.productName} />
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="left">
                <h1 className="pb-4">{currencyConverter(props.price)}</h1>
                <h1>Amount: {props.quantity}</h1>
              </div>
              <div className="flex flex-col text-right">
                <h1>Subtotal:</h1>
                <h1>{currencyConverter(props.price * props.quantity)}</h1>
              </div>
            </div>
          </div>
        }
      </td>
    </tr>
  );
};

export default CheckoutTableDataMobile;
