import React from "react";
import CartProduct from "../CartProduct";
import QuantityButton from "../QuantityButton";
import { BsTrash } from "react-icons/bs";
import { currencyConverter } from "@/utils/utils";

interface ICartTableDataProps {
  id: number;
  price: number;
  quantity: number;
  isChecked: boolean;
  addQuantity: (id: number) => void;
  subtractQuantity: (id: number) => void;
  checkboxChange: (e: any, id: number) => void;
  deleteFunction: (id: number) => void;
}

const CartTableData = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-center">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={props.isChecked}
          onChange={(e) => props.checkboxChange(e, props.id)}
        />
      </td>
      <td className="px-[20px] py-[10px] text-center">{<CartProduct />}</td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price)}
      </td>
      <td className="px-[20px]">
        {
          <QuantityButton
            quantity={props.quantity}
            addQuantity={() => props.addQuantity(props.id)}
            subtractQuantity={() => props.subtractQuantity(props.id)}
          />
        }
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price * props.quantity)}
      </td>
      <td className="px-[20px] py-[10px] text-center">
        <button
          className="text-[25px]"
          onClick={() => props.deleteFunction(props.id)}
        >
          <BsTrash className="text-[#D84727] hover:text-amber-500" />
        </button>
      </td>
    </tr>
  );
};

export default CartTableData;
