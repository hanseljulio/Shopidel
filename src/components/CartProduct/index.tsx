import React from "react";
import Image from "next/image";

const CartProduct = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        alt="productpic"
        src={"/images/emptycart.png"}
        width={250}
        height={250}
        objectFit="cover"
        className="w-[60px] h-[60px]"
      />
      <h1 className="w-[300px]">
        Whitelab Gentle Peeling Gel - Gel Pengangkat Sel Kulit Mati Untu...
      </h1>
    </div>
  );
};

export default CartProduct;
