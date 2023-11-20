import React from "react";
import Image from "next/image";

interface ICartProductProps {
  productName: string;
  productImage: string;
}

const CartProduct = (props: ICartProductProps) => {
  return (
    <div className="flex items-center md:gap-6 justify-center gap-2">
      <img
        alt="productpic"
        src={props.productImage}
        width={250}
        height={250}
        className="w-[60px] h-[60px] object-cover"
        placeholder="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        onError={(e) => {
          (e.target as HTMLInputElement).src =
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }}
      />
      <h1 className="md:w-[300px] text-left w-[250px] md:text-[18px] text-[12px]">
        {props.productName.length > 80
          ? props.productName.substring(0, 80) + "..."
          : props.productName}
      </h1>
    </div>
  );
};

export default CartProduct;
