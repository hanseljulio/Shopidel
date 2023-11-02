import React from "react";
import CartProduct from "../CartProduct";
import { currencyConverter } from "@/utils/utils";
import QuantityButton from "../QuantityButton";
import { BsTrash } from "react-icons/bs";

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

const CartTableDataMobile = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-left">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={props.isChecked}
          onChange={(e) => props.checkboxChange(e, props.id)}
        />
      </td>
      <td className="px-[20px] py-[10px] text-left">
        {
          <div>
            <div className="pb-4">
              <CartProduct />
            </div>
            <div className="flex justify-between">
              <div className="left">
                <h1 className="pb-4 text-[#29374e]">
                  Rp. {currencyConverter(props.price)}
                </h1>
                <QuantityButton
                  quantity={props.quantity}
                  addQuantity={() => props.addQuantity(props.id)}
                  subtractQuantity={() => props.subtractQuantity(props.id)}
                />
              </div>
              <div className="right mr-[50px]">
                <button
                  className="text-[25px]"
                  onClick={() => props.deleteFunction(props.id)}
                >
                  <BsTrash className="text-[#D84727] hover:text-amber-500" />
                </button>
              </div>
            </div>
          </div>
        }
      </td>
    </tr>
  );
};

export default CartTableDataMobile;
