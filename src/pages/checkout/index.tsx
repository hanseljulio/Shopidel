import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CheckoutTableHead from "@/components/CheckoutTableHead";
import CheckoutTableData from "@/components/CheckoutTableData";
import { clientUnauthorizeHandler, currencyConverter } from "@/utils/utils";
import Button from "@/components/Button";
import { FaTicketAlt } from "react-icons/fa";
import Footer from "@/components/Footer";
import CheckoutGrandTotal from "@/components/CheckoutGrandTotal";
import CheckoutTableHeadMobile from "@/components/CheckoutTableHeadMobile";
import CheckoutTableDataMobile from "@/components/CheckoutTableDataMobile";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import Modal from "@/components/Modal";
import CheckoutVoucherModal from "@/components/CheckoutVoucherModal";
import CheckoutAddressModal from "@/components/CheckoutAddressModal";
import { FaWallet } from "react-icons/fa";
import { ICartData } from "@/interfaces/cart_interface";
import { useCartStore } from "@/store/cartStore";
import { API } from "@/network";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IAddress } from "@/interfaces/user_interface";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import PinCode from "@/components/PinCode";
import CheckoutMarketplaceModal from "@/components/CheckoutMarketplaceModal";
import { ICheckoutMarketplace } from "@/interfaces/seller_interface";
import Input from "@/components/Input";
import Head from "next/head";

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
  shop_promotion_id?: number;
  marketplace_promotion_id?: number;
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

interface ICheckoutPaymentProps {
  money: number;
  canPay: boolean;
}

interface CheckoutVoucherSelectProps {
  usedVoucher: number;
  voucherName: string;
  modalOn: () => void;
}

interface ICheckoutMarketplaceSelectProps {
  usedDiscount: number;
  discountName: string;
  modalOn: () => void;
}

interface ICheckoutShippingSelect {
  onChange: (e: any) => void;
  shippingOption: string;
  shippingTotal: number;
  openShippingModal: () => void;
}

const CheckoutShippingSelect = (props: ICheckoutShippingSelect) => {
  return (
    <div className="text-[20px] flex justify-between border-x-2 md:flex-row md:pt-0 flex-col pt-6">
      <div className="basis-[40%] md:py-4 md:pl-6 md:border-r-2 p-0 md:block md:justify-normal flex justify-center border-none">
        <Input
          label="Notes:"
          labelStyle="pt-2"
          styling="flex md:flex-row flex-col items-center gap-3 text-[16px]"
          type="text"
          name="orderMessage"
          placeholder="Write additional notes here"
          width="md:w-[350px] w-[300px]"
          onChange={props.onChange}
        />
      </div>
      <div className="flex-col gap-4 flex md:flex-row md:gap-0 text-[16px] items-center justify-between px-[21px] basis-[60%] py-8 md:py-0">
        <h1 className="text-emerald-500">Shipping option:</h1>
        <h1>{props.shippingOption}</h1>
        <h1
          onClick={props.openShippingModal}
          className="text-blue-600 hover:cursor-pointer hover:underline"
        >
          CHANGE{" "}
          <span className="md:hidden md:invisible visible inline">
            SHIPPING
          </span>
        </h1>
        <h1>
          <span className="md:hidden md:invisible visible inline">
            Shipping price:{" "}
          </span>
          {currencyConverter(props.shippingTotal)}
        </h1>
      </div>
    </div>
  );
};

const CheckoutVoucherSelect = (props: CheckoutVoucherSelectProps) => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4 items-center md:flex-row flex-col gap-6">
      <h1 className="flex items-center gap-3">
        <FaTicketAlt className="text-[#e09664]" />
        Promotions
      </h1>
      <span
        className={`text-[#bb5d1f] text-center ${
          props.usedVoucher === 0 ? "hidden invisible" : ""
        }`}
      >
        Used: {props.voucherName.substring(0, 25) + "..."}
      </span>
      <h1
        onClick={props.modalOn}
        className="text-[18px] text-blue-600 hover:cursor-pointer hover:underline"
      >
        Select Promotion
      </h1>
    </div>
  );
};

const CheckoutPayment = (props: ICheckoutPaymentProps) => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4 items-center md:flex-row flex-col md:gap-0 gap-5">
      <h1 className="flex items-center gap-3">
        <FaWallet className=" text-amber-700" />
        My Wallet
      </h1>
      <span
        className={`text-red-600 ${props.canPay ? "hidden invisible" : ""}`}
      >
        INSUFFICIENT FUNDS
      </span>
      <h1
        className={`text-[20px] ${
          props.canPay ? "text-blue-600" : "text-red-600"
        } font-bold`}
      >
        {currencyConverter(props.money)}
      </h1>
    </div>
  );
};

const NoAddressModal = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[290px] w-[99%]">
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
          onClick={() => router.push("/user/profile/address")}
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

const NoWalletModal = () => {
  const router = useRouter();

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[290px] w-[99%]">
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
  const router = useRouter();
  const { updateUser } = useUserStore();

  const getCourier = async () => {
    try {
      const response = await API.get(`/orders/couriers/${props.sellerId}`);
      setCourierList(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getShippingCost = async () => {
    const sendData = {
      seller_id: props.sellerId,
      destination_address_id: props.destinationAddress,
      courier_id: currentCourierId,
      weight: "200",
    };

    console.log(sendData);

    try {
      const response = await API.post("/orders/cost/check", sendData);
      setShippingCostData(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getCourier();
  }, []);

  useEffect(() => {
    getShippingCost();
  }, [currentCourierId]);

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] md:h-[300px] w-[99%] h-[350px]">
      <div className="pb-3">
        <h1 className="text-[20px]">Select Shipping</h1>
      </div>
      <div className="flex items-center justify-between pt-6 pb-8 md:flex-row md:gap-0 flex-col gap-6">
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
        <div className="md:text-right text-center">
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
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[180px] w-[99%]">
      <div className="pb-5">
        <h1 className="text-[20px] text-center">Verify your Wallet PIN</h1>
      </div>
      <div className="flex justify-center">
        <PinCode onSubmit={(pin) => props.submitFunction(pin)} />
      </div>
    </div>
  );
};

const CheckoutMarketplaceSelect = (props: ICheckoutMarketplaceSelectProps) => {
  return (
    <div className="text-[20px] px-[20px] flex justify-between border-2 py-4 items-center md:flex-row flex-col gap-6">
      <h1 className="flex items-center gap-3">
        <FaTag className="text-[#e09664]" />
        Marketplace
      </h1>
      <span
        className={`text-[#bb5d1f] text-center ${
          props.usedDiscount === 0 ? "hidden invisible" : ""
        }`}
      >
        Used: {props.discountName.substring(0, 25) + "..."}
      </span>
      <h1
        onClick={props.modalOn}
        className="text-[18px] text-blue-600 hover:cursor-pointer hover:underline"
      >
        Select Discount
      </h1>
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
  const [selectedVoucherName, setSelectedVoucherName] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<number>(0);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [promotions, setPromotions] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState<number>(0);
  const [sellerId, setSellerId] = useState<number>(0);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [selectedDiscountName, setSelectedDiscountName] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [shippingTotal, setShippingTotal] = useState<number>(0);
  const [shippingOption, setShippingOption] = useState<string>("");
  const [voucherTotal, setVoucherTotal] = useState<number>(0);
  const [walletMoney, setWalletMoney] = useState<number>(0);
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [courierId, setCourierId] = useState<number>(0);
  const [marketplaceDiscount, setMarketplaceDiscount] = useState<number>(0);

  const [showNoAddress, setShowNoAddress] = useState<boolean>(false);
  const [showNoWallet, setShowNoWallet] = useState<boolean>(false);
  const [showShippingModal, setShowShippingModal] = useState<boolean>(false);
  const [showWalletPin, setShowWalletPin] = useState<boolean>(false);
  const [showMarketplaceModal, setShowMarketplaceModal] =
    useState<boolean>(false);

  const router = useRouter();
  const cartStore = useCartStore();

  const getVoucherData = async (id: number) => {
    try {
      const response = await API.get(`shop-promotions/${id}`);

      if (
        response.data.data.min_purchase_amount > orderTotal ||
        orderTotal > response.data.data.max_purchase_amount
      ) {
        toast.error("Minimum/maximum purchase amount not met!");
        setSelectedVoucher(0);
        return;
      }

      setVoucherTotal(response.data.data.discount_amount);
      setSelectedVoucherName(response.data.data.name);
      setShowVoucherModal(false);
      toast.success("Voucher applied!");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
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

  const getCheckoutData = async () => {
    if (cartStore.cart === undefined || cartStore.cart.length === 0) {
      router.replace("/");
      return;
    }

    let total = 0;
    let currentSellerId = 0;
    for (let i = 0; i < cartStore.cart!.length; i++) {
      for (let j = 0; j < cartStore.cart![i].cart_items.length; j++) {
        if (cartStore.cart![i].cart_items[j].isChecked) {
          currentSellerId = cartStore.cart![i].shop_id;
          setSellerId(currentSellerId);
          total +=
            parseInt(cartStore.cart![i].cart_items[j].product_unit_price) *
            cartStore.cart![i].cart_items[j].product_quantity;
        }
      }
    }

    try {
      const response = await API.get(
        `orders/shop-promotions/${currentSellerId}`
      );
      setPromotions(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }

    try {
      const response = await API.get(`orders/marketplace-promotions`);
      setMarketplace(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }

    setOrderTotal(total);
    setDataTest(cartStore.cart);
    setFullName(userStore.user!.full_name);
    setPhoneNumber(userStore.user!.phone_number);
  };

  const getDefaultAddress = async () => {
    try {
      const response = await API.get("/accounts/address");

      if (response.data.data.length === 0) {
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
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getWalletData = async () => {
    try {
      const response = await API.get("/accounts/wallets");

      if (!response.data.data.isActive) {
        setShowNoWallet(true);
        return;
      }

      setWalletMoney(response.data.data.balance);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
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
      shop_promotion_id: selectedVoucher,
      marketplace_promotion_id: selectedDiscount,
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
        API.post("/orders/checkout", sendData),
        {
          pending: "Loading",
          success: {
            render() {
              cartStore.updateCart(undefined);

              router.replace("/user/transaction-history");

              return "Payment success! Redirecting you back to your order history.";
            },
          },
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
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const payFunction = async (pinNumber: string) => {
    try {
      const response = await API.post("/accounts/wallets/validate-pin", {
        wallet_pin: pinNumber,
      });

      if (response.data.data.isCorrect) {
        submit();
      } else {
        toast.error("Incorrect pin - please try again!");
      }

      setShowWalletPin(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, userStore.updateUser);
        }
        return toast.error(e.message, {
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

  const useMarketplaceDiscount = (data: ICheckoutMarketplace) => {
    if (
      parseInt(data.min_purchase_amount) > orderTotal ||
      orderTotal > parseInt(data.max_purchase_amount)
    ) {
      toast.error("Minimum/maximum purchase amount not met!");
      setSelectedDiscount(0);
      return;
    }

    setMarketplaceDiscount(parseInt(data.discount_amount));
    setSelectedDiscountName(data.name);
    setShowMarketplaceModal(false);
    toast.success("Marketplace discount applied!");
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

      {showMarketplaceModal && (
        <Modal
          content={
            <CheckoutMarketplaceModal
              updateVoucher={(voucher) => setSelectedDiscount(voucher)}
              selectedVoucher={selectedDiscount}
              voucherData={marketplace} // RIGHT HERE
              submitVoucherFunction={useMarketplaceDiscount}
            />
          }
          onClose={() => setShowMarketplaceModal(false)}
        />
      )}

      {showVoucherModal && (
        <Modal
          content={
            <CheckoutVoucherModal
              updateVoucher={changeSelectedVoucher}
              selectedVoucher={selectedVoucher}
              voucherData={promotions}
              submitVoucherFunction={(id) => {
                getVoucherData(id);
              }}
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
        <Head>
          <title>Checkout</title>
        </Head>
        <ToastContainer />
        <div className="lg:max-w-7xl mx-auto">
          <div className="flex md:justify-normal items-center mt-[30px] py-6 justify-center">
            <h1 className="text-[30px] md:text-left text-center">Checkout</h1>
          </div>

          <div className="border-2 px-[20px] text-[20px] p-6 md:text-left text-center">
            <h1 className="flex gap-3 items-center">
              <FaMapMarkerAlt className="text-[#ff3224]" />
              Delivery Address
            </h1>
            <div className="flex text-[18px] pt-6 items-center md:flex-row md:gap-0 flex-col gap-5">
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

          <div className="md:hidden md:invisible visible block">
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
                                productImage={item.product_image_url}
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

          <div className="md:visible md:block hidden invisible">
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
                                productImage={item.product_image_url}
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
          <div className="bg-[#29374e] md:text-right px-[20px] text-[20px] p-6 text-white text-center">
            <h1>
              Order Total: {currencyConverter(orderTotal + shippingTotal)}
            </h1>
          </div>
          <br />
          <CheckoutVoucherSelect
            usedVoucher={selectedVoucher}
            voucherName={selectedVoucherName}
            modalOn={() => setShowVoucherModal(true)}
          />
          <br />
          <CheckoutMarketplaceSelect
            usedDiscount={selectedDiscount}
            discountName={selectedDiscountName}
            modalOn={() => setShowMarketplaceModal(true)}
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
            marketplace={marketplaceDiscount}
          />
          <div className="border-2 md:text-right text-[18px] mb-20 md:pr-4 text-center">
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
