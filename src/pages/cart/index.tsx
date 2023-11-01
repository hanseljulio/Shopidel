import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="cart-content-div mx-[351px]">
        <div className="titles-section mt-[30px]">
          <h1 className="text-[30px]">My Cart</h1>
        </div>
        <div className="cart-section-div flex-col items-center justify-center">
          <Image
            alt="cart pic"
            src={"/images/emptycart.png"}
            width={250}
            height={250}
            objectFit="cover"
            className="w-[250px] h-[250px]"
          />
          <h1 className="text-center">Your cart looks empty!</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
