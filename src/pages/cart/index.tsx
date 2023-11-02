import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart";
import CartTableHead from "@/components/CartTableHead";
import CartTableData from "@/components/CartTableData";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="cart-content-div lg:max-w-7xl mx-auto">
        <div className="titles-section mt-[30px]">
          <h1 className="text-[30px] mobile:text-center">My Cart</h1>
        </div>
        <div className="pt-8 ">
          <table className="w-full border-2">
            <tbody>
              <CartTableHead />
              <CartTableData />
              <CartTableData />
              <CartTableData />
              <CartTableData />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
