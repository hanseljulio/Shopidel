import React from "react";
import CartProduct from "../CartProduct";
import QuantityButton from "../QuantityButton";
import { BsTrash } from "react-icons/bs";
import { currencyConverter } from "@/utils/utils";

interface ICartTableDataProps {
  id: number;
  index: number;
  price: number;
  quantity: number;
  isChecked: boolean;
  productName: string;
  addQuantity: (id: number, index: number) => void;
  subtractQuantity: (id: number, index: number) => void;
  checkboxChange: (e: any, id: number, index: number) => void;
  deleteFunction: (id: number, index: number) => void;
}

const CartTableData = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-center">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={props.isChecked}
          onChange={(e) => props.checkboxChange(e, props.id, props.index)}
        />
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {<CartProduct productName={props.productName} />}
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price)}
      </td>
      <td className="px-[20px]">
        {
          <QuantityButton
            quantity={props.quantity}
            addQuantity={() => props.addQuantity(props.id, props.index)}
            subtractQuantity={() =>
              props.subtractQuantity(props.id, props.index)
            }
          />
        }
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price * props.quantity)}
      </td>
      <td className="px-[20px] py-[10px] text-center">
        <button
          className="text-[25px]"
          onClick={() => props.deleteFunction(props.id, props.index)}
        >
          <BsTrash className="text-[#D84727] hover:text-amber-500" />
        </button>
      </td>
    </tr>
  );
};

export default CartTableData;
