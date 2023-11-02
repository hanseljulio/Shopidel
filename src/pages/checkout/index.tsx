import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CheckoutTableHead from "@/components/CheckoutTableHead";
import CheckoutTableData from "@/components/CheckoutTableData";
import { currencyConverter } from "@/utils/utils";
import Input from "@/components/Input";

interface IDataTest {
  id: number;
  productId: number;
  price: number;
  quantity: number;
  isChecked: false;
}

const CheckoutPage = () => {
  const [dataTest, setDataTest] = useState<IDataTest[]>([
    {
      id: 1,
      productId: 1,
      price: 50000,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 4,
      productId: 4,
      price: 20000,
      quantity: 4,
      isChecked: false,
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="lg:max-w-7xl mx-auto">
        <div className="flex mt-[30px] justify-between mobile:block pb-8">
          <h1 className="text-[30px] mobile:text-center">Checkout</h1>
        </div>
        <div className="mobile:hidden mobile:invisible">
          <table className="w-full border-2">
            <tbody>
              <CheckoutTableHead />
              {dataTest.map((data, index) => (
                <CheckoutTableData
                  key={index}
                  id={data.id}
                  quantity={data.quantity}
                  price={data.price}
                />
              ))}
            </tbody>
          </table>
          <div className="text-[20px] flex justify-between border-x-2">
            <div className="basis-[40%] py-4 pl-6 border-r-2">
              <Input
                label="Message:"
                labelStyle="pt-2"
                styling="flex items-center gap-3 text-[16px]"
                type="text"
                name="orderMessage"
                placeholder="Please leave a message..."
                width="w-[350px]"
              />
            </div>
            <div className="flex text-[16px] items-center justify-between px-[21px] basis-[60%]">
              <h1 className="text-emerald-500">Shipping option:</h1>
              <h1>Regular</h1>
              <h1 className="text-blue-600 hover:cursor-pointer">CHANGE</h1>
              <h1>{currencyConverter(9000)}</h1>
            </div>
          </div>
          <div className="bg-[#29374e] text-right px-[20px] text-[20px] p-6 text-white">
            <h1>Order Total: {currencyConverter(130000)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
