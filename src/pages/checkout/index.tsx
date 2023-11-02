import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CheckoutTableHead from "@/components/CheckoutTableHead";
import CheckoutTableData from "@/components/CheckoutTableData";
import { currencyConverter } from "@/utils/utils";
import Button from "@/components/Button";
import CheckoutVoucherSelect from "@/components/CheckoutVoucherSelect";
import CheckoutShippingSelect from "@/components/CheckoutShippingSelect";
import Footer from "@/components/Footer";

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
          <CheckoutShippingSelect />
          <div className="bg-[#29374e] text-right px-[20px] text-[20px] p-6 text-white">
            <h1>Order Total: {currencyConverter(130000)}</h1>
          </div>
          <br />
          <CheckoutVoucherSelect />
          <div className="bg-[#29374e] text-right px-[20px] p-6 text-white flex items-center justify-end gap-10">
            <div className="text-left h-[150px]">
              <h1>Merchandise Total: </h1>
              <h1>Shipping Total: </h1>
              <h1>Voucher Total: </h1>
              <br />
              <h1 className="pt-3">Total payment: </h1>
            </div>

            <div className="text-right h-[150px]">
              <h1>{currencyConverter(130000)}</h1>
              <h1>{currencyConverter(9000)}</h1>
              <h1>{currencyConverter(1)}</h1>
              <br />
              <h1 className="text-[30px]">{currencyConverter(139001)}</h1>
            </div>
          </div>
          <div className="border-2 text-right text-[18px] mb-20 pr-4">
            <Button
              text="Place order"
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[250px] mobile:w-[100px] my-4"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
