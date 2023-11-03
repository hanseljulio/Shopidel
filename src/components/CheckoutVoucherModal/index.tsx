import React, { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import Button from "../Button";
import { AiFillCloseSquare } from "react-icons/ai";

interface IVoucherProps {
  id: number;
  name: string;
  description: string;
  currentSelectedVoucher: number;
  selectVoucher: (id: number) => void;
}

interface IVoucherModalProps {
  closeFunction: () => void;
  updateVoucher: (id: number) => void;
  selectedVoucher: number;
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
      } w-full border-2 shadow-lg rounded-[8px] px-14 py-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#fddf97] mobile:py-4`}
    >
      <div>
        <FaTicketAlt className="text-[30px] text-[#e09664]" />
      </div>
      <div>
        <h1 className="mobile:text-[14px]">{props.name}</h1>
        <h1 className="mobile:text-[12px]">{props.description}</h1>
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

  const [voucherData, setVoucherData] = useState([
    {
      id: 1,
      name: "Free Shipping",
      description: "Minimum spending Rp 100000",
    },
    {
      id: 2,
      name: "15% Shipping Discount",
      description: "Minimum spending Rp 50000",
    },
    {
      id: 3,
      name: "10% Price Discount",
      description: "Minimum spending Rp 200000",
    },
    {
      id: 4,
      name: "Free Purchase",
      description: "Minimum spending Rp 10000000",
    },
    {
      id: 5,
      name: "50% Shipping Discount",
      description: "Minimum spending Rp 500000",
    },
  ]);

  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[600px] mobile:w-[90%]">
      <div className="flex items-center justify-between pb-3">
        <h1 className="text-[20px] ml-1">Voucher Select</h1>
        <AiFillCloseSquare
          onClick={props.closeFunction}
          className=" text-[30px] text-red-500 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-6 pt-6 overflow-y-scroll h-[80%] pb-8">
        {voucherData.map((data, index) => (
          <IndividualVoucher
            key={index}
            id={data.id}
            name={data.name}
            description={data.description}
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
