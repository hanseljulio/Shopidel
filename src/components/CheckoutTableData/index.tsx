import React from "react";
import CartProduct from "../CartProduct";
import { currencyConverter } from "@/utils/utils";

interface ICartTableDataProps {
  id: number;
  price: number;
  quantity: number;
}

const CheckoutTableData = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-center flex items-start">
        {<CartProduct />}
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price)}
      </td>
      <td className="px-[20px] text-center">{props.quantity}</td>
      <td className="px-[20px] py-[10px] text-right">
        {currencyConverter(props.price * props.quantity)}
      </td>
    </tr>
  );
};

export default CheckoutTableData;
