import React from "react";

const QuantityButton = () => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="button"
        value="-"
        className="w-[25px] h-[25px] border-gray-300 border-[1px]"
      />
      <input
        type="text"
        name="quantity"
        value="0"
        className="w-[40px] h-[25px] text-center"
      />
      <input
        type="button"
        value="+"
        className="w-[25px] h-[25px] border-gray-300 border-[1px]"
      />
    </div>
  );
};

export default QuantityButton;
