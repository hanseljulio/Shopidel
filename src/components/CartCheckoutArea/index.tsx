import React from "react";
import { currencyConverter } from "@/utils/utils";
import Button from "../Button";

interface ICartCheckoutAreaProps {
  totalPrice: number;
  checkoutFunction: (e: any) => void;
}

const CartCheckoutArea = (props: ICartCheckoutAreaProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#29374e]">
      <div className="flex md:justify-between items-center lg:max-w-7xl mx-auto justify-around">
        <h1 className="md:text-[25px] text-white text-[16px]">
          Total Price: {currencyConverter(props.totalPrice)}
        </h1>
        <Button
          text="Checkout"
          onClick={props.checkoutFunction}
          styling="bg-[#fddf97] p-3 rounded-[8px] md:w-[250px] w-[100px] my-4"
        />
      </div>
    </div>
  );
};

export default CartCheckoutArea;
