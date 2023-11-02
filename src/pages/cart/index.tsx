import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart";
import CartTableHead from "@/components/CartTableHead";
import CartTableData from "@/components/CartTableData";

const CartPage = () => {
  const [quantityTest, setQuantityTest] = useState<number>(1);

  const addQuantity = () =>
    setQuantityTest((prev) => (prev <= 98 ? prev + 1 : prev));
  const subtractQuantity = () =>
    setQuantityTest((prev) => (prev >= 2 ? prev - 1 : prev));

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cart-content-div lg:max-w-7xl mx-auto">
        <div className="flex mt-[30px] justify-between">
          <h1 className="text-[30px] mobile:text-center">My Cart</h1>
          <Button
            text="Delete All"
            styling="bg-red-500 px-6 text-white rounded-[8px]"
          />
        </div>
        <div className="pt-8 pb-[150px]">
          <table className="w-full border-2">
            <tbody>
              <CartTableHead />
              <CartTableData
                id={1}
                price={30000000}
                quantity={quantityTest}
                addQuantity={addQuantity}
                subtractQuantity={subtractQuantity}
              />
            </tbody>
          </table>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#364968]">
          <div className="flex justify-between items-center lg:max-w-7xl mx-auto">
            <h1 className="text-[25px] text-white">
              Total Price: Rp. 30000000
            </h1>
            <Button
              text="Checkout"
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[250px] my-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
