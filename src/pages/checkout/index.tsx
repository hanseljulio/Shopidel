import React, { useState, useEffect } from "react";
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
import CheckoutPayment from "@/components/CheckoutPayment";
import { ICartData } from "@/interfaces/cart_interface";
import { useCartStore } from "@/store/cartStore";

const CheckoutPage = () => {
  const [dataTest, setDataTest] = useState<ICartData[] | undefined>([
    {
      shop_id: 0,
      shop_name: "",
      cart_items: [],
    },
  ]);

  const [showVoucherModal, setShowVoucherModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);

  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [shippingTotal, setShippingTotal] = useState<number>(10000);
  const [shippingOption, setShippingOption] = useState<string>("REGULAR");
  const [voucherTotal, setVoucherTotal] = useState<number>(50000);
  const [walletMoney, setWalletMoney] = useState<number>(20000000);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const cartStore = useCartStore();

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

  const getCheckoutData = () => {
    let total = 0;
    for (let i = 0; i < cartStore.cart!.length; i++) {
      for (let j = 0; j < cartStore.cart![i].cart_items.length; j++) {
        if (cartStore.cart![i].cart_items[j].isChecked) {
          total +=
            parseInt(cartStore.cart![i].cart_items[j].product_unit_price) *
            cartStore.cart![i].cart_items[j].product_quantity;
        }
      }
    }

    setOrderTotal(total);
    setDataTest(cartStore.cart);
  };

  useEffect(() => {
    getCheckoutData();
  }, []);

  return (
    <>
      {showVoucherModal && (
        <Modal
          content={
            <CheckoutVoucherModal
              updateVoucher={changeSelectedVoucher}
              selectedVoucher={selectedVoucher}
              submitVoucherFunction={useVoucher}
            />
          }
          onClose={() => setShowVoucherModal(false)}
        />
      )}

      {showAddressModal && (
        <Modal
          content={
            <CheckoutAddressModal
              updateAddress={changeSelectedAddress}
              selectedAddress={selectedAddress}
              submitAddressFunction={useAddress}
            />
          }
          onClose={() => setShowAddressModal(false)}
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
                {dataTest!.map((data, index) => {
                  if (data.cart_items.length !== 0) {
                    return (
                      <>
                        {data.cart_items.map((item) => {
                          if (item.isChecked) {
                            return (
                              <CheckoutTableDataMobile
                                key={index}
                                id={item.product_id}
                                quantity={item.product_quantity}
                                price={parseInt(item.product_unit_price)}
                                productName={item.product_name}
                              />
                            );
                          }
                        })}
                      </>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          <div className="mobile:hidden mobile:invisible">
            <table className="w-full border-2">
              <tbody>
                <CheckoutTableHead />
                {dataTest!.map((data, index) => {
                  if (data.cart_items.length !== 0) {
                    return (
                      <>
                        {data.cart_items.map((item) => {
                          if (item.isChecked) {
                            return (
                              <CheckoutTableData
                                key={index}
                                id={item.product_id}
                                quantity={item.product_quantity}
                                price={parseInt(item.product_unit_price)}
                                productName={item.product_name}
                              />
                            );
                          }
                        })}
                      </>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <CheckoutShippingSelect
            onChange={(e) => setAdditionalNotes(e.target.value)}
            shippingOption={shippingOption}
            shippingTotal={shippingTotal}
          />
          <div className="bg-[#29374e] text-right px-[20px] text-[20px] p-6 text-white mobile:text-center">
            <h1>
              Order Total: {currencyConverter(orderTotal + shippingTotal)}
            </h1>
          </div>
          <br />
          <CheckoutVoucherSelect
            usedVoucher={selectedVoucher}
            modalOn={() => setShowVoucherModal(true)}
          />
          <br />
          <CheckoutPayment
            money={walletMoney}
            canPay={
              walletMoney - (orderTotal + shippingTotal - voucherTotal) > 0
            }
          />
          <CheckoutGrandTotal
            merchandise={orderTotal}
            shipping={shippingTotal}
            voucher={voucherTotal}
          />
          <div className="border-2 text-right text-[18px] mb-20 pr-4 mobile:text-center">
            <Button
              text="Place order"
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[250px]  my-4"
              disabled={
                walletMoney - (orderTotal + shippingTotal - voucherTotal) < 0
              }
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
