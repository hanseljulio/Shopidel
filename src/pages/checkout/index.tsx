import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CheckoutTableHead from "@/components/CheckoutTableHead";
import CheckoutTableData from "@/components/CheckoutTableData";
import { currencyConverter } from "@/utils/utils";
import Button from "@/components/Button";
import CheckoutVoucherSelect from "@/components/CheckoutVoucherSelect";
import CheckoutShippingSelect from "@/components/CheckoutShippingSelect";
import Footer from "@/components/Footer";
import CheckoutGrandTotal from "@/components/CheckoutGrandTotal";
import CheckoutTableHeadMobile from "@/components/CheckoutTableHeadMobile";
import CheckoutTableDataMobile from "@/components/CheckoutTableDataMobile";
import { FaMapMarkerAlt } from "react-icons/fa";
import Modal from "@/components/Modal";
import CheckoutVoucherModal from "@/components/CheckoutVoucherModal";
import CheckoutAddressModal from "@/components/CheckoutAddressModal";

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

  const [showVoucherModal, setShowVoucherModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);

  const useVoucher = () => {
    setShowVoucherModal(false);
    console.log(selectedVoucher);
  };

  const changeSelectedVoucher = (id: number) => {
    setSelectedVoucher(id);
  };

  const useAddress = () => {
    setShowAddressModal(false);
    console.log(selectedAddress);
  };

  const changeSelectedAddress = (id: number) => {
    setSelectedAddress(id);
  };

  return (
    <>
      {showVoucherModal && (
        <Modal
          content={
            <CheckoutVoucherModal
              closeFunction={() => setShowVoucherModal(false)}
              updateVoucher={changeSelectedVoucher}
              selectedVoucher={selectedVoucher}
              submitVoucherFunction={useVoucher}
            />
          }
        />
      )}

      {showAddressModal && (
        <Modal
          content={
            <CheckoutAddressModal
              closeFunction={() => setShowAddressModal(false)}
              updateAddress={changeSelectedAddress}
              selectedAddress={selectedAddress}
              submitAddressFunction={useAddress}
            />
          }
        />
      )}

      <div>
        <Navbar />
        <div className="lg:max-w-7xl mx-auto">
          <div className="flex mt-[30px] justify-between mobile:block pb-8">
            <h1 className="text-[30px] mobile:text-center">Checkout</h1>
          </div>

          <div className="border-2 px-[20px] text-[20px] p-6 mobile:text-center">
            <h1 className="flex gap-3 items-center">
              <FaMapMarkerAlt className="text-[#ff3224]" />
              Delivery Address
            </h1>
            <div className="flex text-[18px] pt-6 items-center mobile:flex-col mobile:gap-5">
              <h1 className="font-bold basis-[20%]">
                Hansel Julio (+62) 81519799999
              </h1>
              <h1 className="basis-[70%]">
                Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3, Kuningan
                Timur, Kecamatan Setiabudi, KOTA JAKARTA SELATAN - SETIA BUDI,
                DKI JAKARTA, ID 12950{" "}
                <span className="text-orange-500 text-[14px]">[DEFAULT]</span>
              </h1>
              <h1
                onClick={() => setShowAddressModal(true)}
                className="text-blue-600 text-right hover:cursor-pointer hover:underline basis-[7%]"
              >
                Change
              </h1>
            </div>
          </div>
          <br />

          <div className="hidden invisible mobile:visible mobile:block">
            <table className="mx-auto">
              <tbody>
                <CheckoutTableHeadMobile />
                {dataTest.map((data, index) => (
                  <CheckoutTableDataMobile
                    key={index}
                    id={data.id}
                    quantity={data.quantity}
                    price={data.price}
                  />
                ))}
              </tbody>
            </table>
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
          </div>
          <CheckoutShippingSelect />
          <div className="bg-[#29374e] text-right px-[20px] text-[20px] p-6 text-white mobile:text-center">
            <h1>Order Total: {currencyConverter(130000)}</h1>
          </div>
          <br />
          <CheckoutVoucherSelect modalOn={() => setShowVoucherModal(true)} />
          <CheckoutGrandTotal
            merchandise={130000}
            shipping={9000}
            voucher={1000}
          />
          <div className="border-2 text-right text-[18px] mb-20 pr-4 mobile:text-center">
            <Button
              text="Place order"
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[250px]  my-4"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
