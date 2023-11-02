import React from "react";

interface ICartTableHeadProps {
  handleCheckAll: (e: any) => void;
}

const CartTableHeadMobile = (props: ICartTableHeadProps) => {
  return (
    <tr className="border-2">
      <th className="px-[20px] py-[10px] text-center w-[20px] h-[65px]">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          name="allselect"
          onChange={props.handleCheckAll}
        />
      </th>
      <th className="px-[20px] py-[10px] text-center w-[190px] h-[65px]">
        Product
      </th>
    </tr>
  );
};

export default CartTableHeadMobile;
