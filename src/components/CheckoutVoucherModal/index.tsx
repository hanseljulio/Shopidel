import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import Button from "../Button";
import { AiFillCloseSquare } from "react-icons/ai";
import { ICheckoutPromotions } from "@/interfaces/seller_interface";
import { currencyConverter } from "@/utils/utils";

interface IVoucherProps {
  id: number;
  name: string;
  description: string;
  currentSelectedVoucher: number;
  selectVoucher: (id: number) => void;
}

interface IVoucherModalProps {
  updateVoucher: (id: number) => void;
  selectedVoucher: number;
  voucherData: ICheckoutPromotions[];
  submitVoucherFunction: () => void;
}

const IndividualVoucher = (props: IVoucherProps) => {
  const [color, setColor] = useState<string>("");
  return (
    <div
      onClick={() => {
        props.selectVoucher(props.id);
        if (props.currentSelectedVoucher === props.id) {
          setColor("bg-[#fddf97]");
        } else {
          setColor("bg-white");
        }
      }}
      className={`${
        props.currentSelectedVoucher === props.id ? "bg-[#fddf97]" : color
      } w-full border-2 shadow-lg rounded-[8px] md:px-14 md:py-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#fddf97] py-4 px-8`}
    >
      <div>
        <FaTicketAlt className="text-[30px] text-[#e09664]" />
      </div>
      <div>
        <h1 className="md:text-[18px] text-[14px]">{props.name}</h1>
        <h1 className="md:text-[14px] text-[12px]">{props.description}</h1>
      </div>
    </div>
  );
};

const CheckoutVoucherModal = (props: IVoucherModalProps) => {
  const [selectedVoucher, setSelectedVoucher] = useState<number>(
    props.selectedVoucher
  );

  const changeSelectedVoucherLocal = (id: number) => {
    setSelectedVoucher(id);
  };

  const [voucherData, setVoucherData] = useState<ICheckoutPromotions[]>(
    props.voucherData
  );

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[600px] w-[99%]">
      <div className=" pb-3">
        <h1 className="text-[20px] ml-1">Voucher Select</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6 overflow-y-scroll h-[80%] pb-8">
        {voucherData.map((data, index) => (
          <IndividualVoucher
            key={index}
            id={data.id}
            name={data.name}
            description={`Mininum purchase ${currencyConverter(
              parseInt(data.min_purchase_amount)
            )}, Maximum purchase ${currencyConverter(
              parseInt(data.max_purchase_amount)
            )}`}
            currentSelectedVoucher={selectedVoucher}
            selectVoucher={changeSelectedVoucherLocal}
          />
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Select Voucher"
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
          disabled={selectedVoucher === 0}
          onClick={() => {
            props.updateVoucher(selectedVoucher);
            props.submitVoucherFunction();
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutVoucherModal;
