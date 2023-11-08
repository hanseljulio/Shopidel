import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import Button from "../Button";

interface IAddressProps {
  id: number;
  address: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  default: boolean;
  currentSelectedAddress: number;
  selectAddress: (id: number) => void;
}

interface IAddressModalProps {
  updateAddress: (id: number) => void;
  selectedAddress: number;
  submitAddressFunction: () => void;
}

const IndividualAddress = (props: IAddressProps) => {
  const [color, setColor] = useState<string>("");
  return (
    <div
      onClick={() => {
        props.selectAddress(props.id);
        if (props.currentSelectedAddress === props.id) {
          setColor("bg-[#fddf97]");
        } else {
          setColor("bg-white");
        }
      }}
      className={`${
        props.currentSelectedAddress === props.id ? "bg-[#fddf97]" : color
      } w-full border-2 shadow-lg rounded-[8px] px-14 py-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#fddf97] mobile:py-4 mobile:px-8`}
    >
      <div>
        <FaHome className="text-[30px] text-[#e09664]" />
      </div>
      <div>
        <h1 className="mobile:text-[14px]">{props.address}</h1>
        <h1 className="mobile:text-[12px]">{`${props.city} - ${props.district}, ${props.province}, ID ${props.postalCode}`}</h1>
        {props.default && (
          <h1 className="text-[14px] text-orange-500">[DEFAULT]</h1>
        )}
      </div>
    </div>
  );
};

const CheckoutAddressModal = (props: IAddressModalProps) => {
  const [selectedAddress, setSelectedAddress] = useState<number>(
    props.selectedAddress
  );

  const changeSelectedAddressLocal = (id: number) => {
    setSelectedAddress(id);
  };

  const [addressData, setAddressData] = useState([
    {
      id: 1,
      address:
        "Sopo Del Tower, Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3",
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      district: "Setia Budi",
      postalCode: "12950",
      default: true,
    },
    {
      id: 2,
      address:
        "Pakuwon Tower, Jl. Menteng Atas Sel. Gg. 2, Menteng Dalam, Kec. Menteng",
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      district: "Menteng",
      postalCode: "12870",
      default: false,
    },
    {
      id: 3,
      address: "Kota Kasablanka, Jl. Raya Casablanca No.88, Menteng Dalam",
      province: "DKI Jakarta",
      city: "Jakarta Selatan",
      district: "Tebet",
      postalCode: "12870",
      default: false,
    },
    {
      id: 4,
      address: "Senayan City, Jl. Asia Afrika, Gelora",
      province: "DKI Jakarta",
      city: "Jakarta Pusat",
      district: "Tanah Abang",
      postalCode: "10270",
      default: false,
    },
    {
      id: 5,
      address: "Grand Indonesia, Jl. Tlk. Betung I No.45A, Kb. Melati",
      province: "DKI Jakarta",
      city: "Jakarta Pusat",
      district: "Tanah Abang",
      postalCode: "10230",
      default: false,
    },
  ]);

  return (
    <div className="bg-white p-5 rounded-md  w-[500px] h-[600px] mobile:w-[99%]">
      <div className="pb-3">
        <h1 className="text-[20px] ml-1">Address Select</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6 overflow-y-scroll h-[80%] pb-8">
        {addressData.map((data, index) => (
          <IndividualAddress
            key={index}
            id={data.id}
            address={data.address}
            province={data.province}
            city={data.city}
            district={data.district}
            postalCode={data.postalCode}
            default={data.default}
            currentSelectedAddress={selectedAddress}
            selectAddress={changeSelectedAddressLocal}
          />
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Select Address"
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
          disabled={selectedAddress === 0}
          onClick={() => {
            props.updateAddress(selectedAddress);
            props.submitAddressFunction();
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutAddressModal;
