import React from "react";
import Image from "next/image";

interface ICartProductProps {
  productName: string;
}

const CartProduct = (props: ICartProductProps) => {
  return (
    <div className="flex items-center gap-6 justify-center mobile:gap-2">
      <img
        alt="productpic"
        src={"/images/emptycart.png"}
        width={250}
        height={250}
        className="w-[60px] h-[60px] object-cover"
      />
      <h1 className="w-[300px] text-left mobile:w-[250px] mobile:text-[12px]">
        {props.productName.length > 80
          ? props.productName.substring(0, 80) + "..."
          : props.productName}
      </h1>
    </div>
  );
};

export default CartProduct;
