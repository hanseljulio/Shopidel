import React from "react";
import CartProduct from "../CartProduct";
import QuantityButton from "../QuantityButton";
import { BsTrash } from "react-icons/bs";

const CartTableData = () => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-center">
        <input type="checkbox" />
      </td>
      <td className="px-[20px] py-[10px] text-center">{<CartProduct />}</td>
      <td className="px-[20px] py-[10px] text-center">Rp. 30000000</td>
      <td className="px-[20px]">{<QuantityButton />}</td>
      <td className="px-[20px] py-[10px] text-center">Rp. 30000000</td>
      <td className="px-[20px] py-[10px] text-center">
        <button className="text-[25px]">
          <BsTrash className="text-[#D84727] hover:text-amber-500" />
        </button>
      </td>
    </tr>
  );
};

export default CartTableData;
