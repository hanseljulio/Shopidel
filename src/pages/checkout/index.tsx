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
import { API } from "@/network";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IAddress } from "@/interfaces/address_interface";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import PinCode from "@/components/PinCode";

interface IProductVariant {
  id: number;
  quantity: number;
}

interface ISendData {
  seller_id: number;
  product_variant: IProductVariant[];
  destination_address_id: string;
  courier_id: number;
  notes: string;
  weight: string;
  voucher_id?: number;
}

interface ICourierList {
  id: number;
  name: string;
  description: string;
}

interface ISelectShippingModalProps {
  confirmFunction: (id: number, name: string, shippingCost: number) => void;
  sellerId: number;
  destinationAddress: string;
}

interface IShippingCostData {
  cost: number;
  estimated: string;
  note: string;
}

interface IEnterWalletPinModalProps {
  submitFunction: (pin: string) => void;
}

const NoAddressModal = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[290px] mobile:w-[99%]">
      <div className="pb-3">
        <h1 className="text-[20px]">No Address Found</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6  pb-8">
        <h1>It appears you have no address!</h1>
        <h1>Click the button to go and add one!</h1>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Add New Address"
          onClick={() => router.push("/user/address")}
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

const NoWalletModal = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[290px] mobile:w-[99%]">
      <div className="pb-3">
        <h1 className="text-[20px]">Wallet has not been activated</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6  pb-8">
        <h1>It appears you have not activated your wallet!</h1>
        <h1>Click the button to go and activate it!</h1>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Go to Wallet Menu"
          onClick={() => router.push("/user/wallet")}
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

const SelectShippingModal = (props: ISelectShippingModalProps) => {
  const [courierList, setCourierList] = useState<ICourierList[]>([]);
  const [currentCourierId, setCurrentCourierId] = useState<number>(1);
  const [currentName, setCurrentName] = useState<string>("JNE");
  const [shippingCostData, setShippingCostData] = useState<IShippingCostData>();

  const getCourier = async () => {
    try {
      const response = await API.get("/orders/couriers/1", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      setCourierList(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getShippingCost = async () => {
    const sendData = {
      seller_id: props.sellerId,
      destination_address_id: props.destinationAddress,
      courier_id: currentCourierId,
      weight: "200",
    };

    try {
      const response = await API.post("/orders/cost/check", sendData, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      setShippingCostData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCourier();
  }, []);

  useEffect(() => {
    getShippingCost();
  }, [currentCourierId]);

  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[300px] mobile:w-[99%] mobile:h-[350px]">
      <div className="pb-3">
        <h1 className="text-[20px]">Select Shipping</h1>
      </div>
      <div className="flex items-center justify-between pt-6 pb-8 mobile:flex-col mobile: gap-6">
        <div>
          <h1>Select courier here</h1>
          <select
            onChange={(e) => {
              setCurrentCourierId(parseInt(e.target.value));
              setCurrentName(
                e.target.options[parseInt(e.target.value) - 1].text
              );
            }}
            className={`p-4 w-[200px] rounded`}
            name="category-dropdown"
          >
            {courierList.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="text-right mobile:text-center">
          <h1>
            Shipping cost:{" "}
            {currencyConverter(
              shippingCostData?.cost ? shippingCostData.cost : 0
            )}
          </h1>
          <h1>ETD: {shippingCostData?.estimated} day(s)</h1>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Confirm Shipping"
          onClick={() =>
            props.confirmFunction(
              currentCourierId,
              currentName,
              shippingCostData!.cost
            )
          }
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

const EnterWalletPinModal = (props: IEnterWalletPinModalProps) => {
  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[180px] mobile:w-[99%]">
      <div className="pb-5">
        <h1 className="text-[20px] text-center">Verify your Wallet PIN</h1>
      </div>
      <div className="flex justify-center">
        <PinCode onSubmit={(pin) => props.submitFunction(pin)} />
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const [dataTest, setDataTest] = useState<ICartData[] | undefined>([
    {
      shop_id: 0,
      shop_name: "",
      cart_items: [],
    },
  ]);

  const userStore = useUserStore();

  const [showVoucherModal, setShowVoucherModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<number>(0);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<number>(0);
  const [sellerId, setSellerId] = useState<number>(0);

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [shippingTotal, setShippingTotal] = useState<number>(0);
  const [shippingOption, setShippingOption] = useState<string>("");
  const [voucherTotal, setVoucherTotal] = useState<number>(50000);
  const [walletMoney, setWalletMoney] = useState<number>(0);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [courierId, setCourierId] = useState<number>(0);

  const [showNoAddress, setShowNoAddress] = useState<boolean>(false);
  const [showNoWallet, setShowNoWallet] = useState<boolean>(false);
  const [showShippingModal, setShowShippingModal] = useState<boolean>(false);
  const [showWalletPin, setShowWalletPin] = useState<boolean>(false);

  const cartStore = useCartStore();

  const useVoucher = () => {
    setShowVoucherModal(false);
  };

  const changeSelectedVoucher = (id: number) => {
    setSelectedVoucher(id);
  };

  const useAddress = () => {
    setShowAddressModal(false);
  };

  const changeSelectedAddress = (id: number, newAddress: string) => {
    setSelectedAddress(id);
    setCurrentAddress(newAddress);
  };

  const getCheckoutData = () => {
    let total = 0;
    for (let i = 0; i < cartStore.cart!.length; i++) {
      for (let j = 0; j < cartStore.cart![i].cart_items.length; j++) {
        if (cartStore.cart![i].cart_items[j].isChecked) {
          setSellerId(cartStore.cart![i].shop_id);
          total +=
            parseInt(cartStore.cart![i].cart_items[j].product_unit_price) *
            cartStore.cart![i].cart_items[j].product_quantity;
        }
      }
    }

    setOrderTotal(total);
    setDataTest(cartStore.cart);
    setFullName(userStore.user!.full_name);
    setPhoneNumber(userStore.user!.phone_number);
  };

  const getDefaultAddress = async () => {
    try {
      const response = await API.get("/accounts/address", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      if (response.data.data === 0) {
        setShowNoAddress(true);
        return;
      }

      setAddressData(response.data.data);

      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].is_buyer_default) {
          setSelectedAddress(response.data.data[i].id);
          setDefaultAddressId(response.data.data[i].id);
          setCurrentAddress(
            `${response.data.data[i].detail}\n${response.data.data[i].sub_district} - ${response.data.data[i].district}, ${response.data.data[i].province}, ID ${response.data.data[i].zip_code}`
          );
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getWalletData = async () => {
    try {
      const response = await API.get("/accounts/wallets", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      if (!response.data.data.isActive) {
        setShowNoWallet(true);
        return;
      }

      setWalletMoney(response.data.data.balance);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);

  useEffect(() => {
    getDefaultAddress();
  }, []);

  useEffect(() => {
    getCheckoutData();
  }, []);

  const submit = async () => {
    const sendData: ISendData = {
      seller_id: sellerId,
      product_variant: [],
      destination_address_id: selectedAddress.toString(),
      courier_id: courierId,
      notes: additionalNotes,
      weight: "200",
      // "voucher_id": 1 // optional
    };

    for (let i = 0; i < cartStore.cart!.length; i++) {
      for (let j = 0; j < cartStore.cart![i].cart_items.length; j++) {
        if (cartStore.cart![i].cart_items[j].isChecked) {
          sendData.product_variant.push({
            id: cartStore.cart![i].cart_items[j].product_id,
            quantity: cartStore.cart![i].cart_items[j].product_quantity,
          });
        }
      }
    }

    try {
      toast.promise(
        API.post("/orders/checkout", sendData, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }),
        {
          pending: "Loading",
          success: "Payment success!",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return `${(data.response?.data as IAPIResponse).message}`;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const payFunction = async (pinNumber: string) => {
    try {
      const response = await API.post(
        "/accounts/wallets/validate-pin",
        {
          wallet_pin: pinNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.data.data.isCorrect) {
        submit();
      } else {
        toast.error("Incorrect pin - please try again!");
      }

      setShowWalletPin(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const confirmFunction = (id: number, name: string, shippingCost: number) => {
    setCourierId(id);
    setShippingOption(name.toUpperCase());
    setShippingTotal(shippingCost);
    setShowShippingModal(false);
  };

  return (
    <>
      {showWalletPin && (
        <Modal
          content={<EnterWalletPinModal submitFunction={payFunction} />}
          onClose={() => setShowWalletPin(false)}
        />
      )}

      {showShippingModal && (
        <Modal
          content={
            <SelectShippingModal
              sellerId={sellerId}
              destinationAddress={selectedAddress.toString()}
              confirmFunction={confirmFunction}
            />
          }
          onClose={() => setShowShippingModal(false)}
        />
      )}

      {showNoWallet && <Modal content={<NoWalletModal />} onClose={() => {}} />}

      {showNoAddress && (
        <Modal content={<NoAddressModal />} onClose={() => {}} />
      )}

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
              addressData={addressData}
            />
          }
          onClose={() => setShowAddressModal(false)}
        />
      )}

      <div>
        <Navbar />
        <ToastContainer />
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
              <h1
                suppressHydrationWarning
                className="flex flex-col font-bold basis-[20%]"
              >
                {fullName}
                <span>{phoneNumber}</span>
              </h1>
              <h1 className="basis-[70%]">
                {currentAddress}{" "}
                <span
                  className={`${
                    defaultAddressId !== selectedAddress
                      ? "hidden invisible"
                      : ""
                  } text-orange-500 text-[14px]`}
                >
                  [DEFAULT]
                </span>
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
                                key={index + Math.random()}
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
                                key={index + Math.random()}
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
            openShippingModal={() => setShowShippingModal(true)}
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
              onClick={() => {
                if (shippingOption === "") {
                  toast.error("Please select a shipping option!");
                  return;
                }

                setShowWalletPin(true);
              }}
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
