import Navbar from "@/components/Navbar";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <div className="cart-content-div mx-[351px]">
        <div className="titles-section mt-[30px]">
          <h1 className="text-[30px]">My Cart</h1>
        </div>
        <div className="cart-section-div">
          <h1>The table will be here</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
