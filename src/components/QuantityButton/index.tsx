import React from "react";

interface IQuantityButtonProps {
  quantity: number;
  addQuantity: () => void;
  subtractQuantity: () => void;
}

const QuantityButton = (props: IQuantityButtonProps) => {
  return (
    <div className="flex items-center md:justify-center justify-start">
      <input
        type="button"
        value="-"
        className="w-[25px] h-[25px] border-gray-300 border-[1px] hover:cursor-pointer"
        onClick={props.subtractQuantity}
      />
      <input
        type="text"
        name="quantity"
        value={props.quantity}
        className="w-[50px] h-[25px] text-center"
      />
      <input
        type="button"
        value="+"
        className="w-[25px] h-[25px] border-gray-300 border-[1px] hover:cursor-pointer"
        onClick={props.addQuantity}
      />
    </div>
  );
};

export default QuantityButton;
