import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="cart-content-div lg:max-w-7xl mx-[351px] mobile:mx-auto">
        <div className="titles-section mt-[30px]">
          <h1 className="text-[30px] mobile:text-center">My Cart</h1>
        </div>
        <EmptyCart />
      </div>
    </div>
  );
};

export default CartPage;
