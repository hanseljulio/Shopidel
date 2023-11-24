import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import Button from "../Button";
import { currencyConverter } from "@/utils/utils";
import { ICheckoutMarketplace } from "@/interfaces/seller_interface";

interface IVoucherProps {
  currentSelectedVoucher: number;
  data: ICheckoutMarketplace;
  selectVoucher: (id: number) => void;
  selectDiscount: (discount: ICheckoutMarketplace) => void;
}

interface IVoucherModalProps {
  updateVoucher: (id: number) => void;
  selectedVoucher: number;
  voucherData: ICheckoutMarketplace[];
  submitVoucherFunction: (discount: ICheckoutMarketplace) => void;
}

interface IMarketplacePromotions {
  id: number;
  name: string;
  min_purchase_amount: string;
  max_purchase_amount: string;
  discount_amount: string;
}

const IndividualVoucher = (props: IVoucherProps) => {
  const [color, setColor] = useState<string>("");

  return (
    <div
      onClick={() => {
        props.selectVoucher(props.data.id);
        props.selectDiscount(props.data);
        if (props.currentSelectedVoucher === props.data.id) {
          setColor("bg-[#fddf97]");
        } else {
          setColor("bg-white");
        }
      }}
      className={`${
        props.currentSelectedVoucher === props.data.id ? "bg-[#fddf97]" : color
      } w-full border-2 shadow-lg rounded-[8px] md:px-14 md:py-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#fddf97] py-4 px-8`}
    >
      <div>
        <FaTicketAlt className="text-[30px] text-[#e09664]" />
      </div>
      <div>
        <h1 className="md:text-[18px] text-[14px]">{props.data.name}</h1>
        <h1 className="md:text-[14px] text-[12px]">{`Mininum purchase ${currencyConverter(
          parseInt(props.data.min_purchase_amount)
        )}, Maximum purchase ${currencyConverter(
          parseInt(props.data.max_purchase_amount)
        )}`}</h1>
      </div>
    </div>
  );
};

const CheckoutMarketplaceModal = (props: IVoucherModalProps) => {
  const [selectedVoucher, setSelectedVoucher] = useState<number>(
    props.selectedVoucher
  );

  const changeSelectedVoucherLocal = (id: number) => {
    setSelectedVoucher(id);
  };

  const [voucherData, setVoucherData] = useState<IMarketplacePromotions[]>(
    props.voucherData
  );

  const [selectedDiscount, setSelectedDiscount] =
    useState<ICheckoutMarketplace>({
      id: 0,
      name: "",
      min_purchase_amount: "",
      max_purchase_amount: "",
      discount_amount: "",
    });

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[600px] w-[99%]">
      <div className=" pb-3">
        <h1 className="text-[20px] ml-1">Voucher Select</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6 overflow-y-scroll h-[80%] pb-8">
        {voucherData.map((data, index) => {
          return (
            <IndividualVoucher
              key={index}
              data={data}
              currentSelectedVoucher={selectedVoucher}
              selectVoucher={changeSelectedVoucherLocal}
              selectDiscount={(data) => setSelectedDiscount(data)}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Select Discount"
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
          disabled={selectedVoucher === 0}
          onClick={() => {
            props.updateVoucher(selectedVoucher);
            props.submitVoucherFunction(selectedDiscount);
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutMarketplaceModal;
