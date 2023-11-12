import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import Button from "../Button";
import { IAddress } from "@/interfaces/user_interface";

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
  updateNewAddress: (newAddress: string) => void;
}

interface IAddressModalProps {
  updateAddress: (id: number, newAddress: string) => void;
  selectedAddress: number;
  submitAddressFunction: () => void;
  addressData: IAddress[];
}

const IndividualAddress = (props: IAddressProps) => {
  const [color, setColor] = useState<string>("");
  return (
    <div
      onClick={() => {
        props.selectAddress(props.id);

        props.updateNewAddress(
          `${props.address}\n${props.city} - ${props.district}, ${props.province}, ID ${props.postalCode}`
        );
        if (props.currentSelectedAddress === props.id) {
          setColor("bg-[#fddf97]");
        } else {
          setColor("bg-white");
        }
      }}
      className={`${
        props.currentSelectedAddress === props.id ? "bg-[#fddf97]" : color
      } w-full border-2 shadow-lg rounded-[8px] md:px-14 md:py-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#fddf97] py-4 px-8`}
    >
      <div>
        <FaHome className="text-[30px] text-[#e09664]" />
      </div>
      <div>
        <h1 className="md:text-[18px] text-[14px]">{props.address}</h1>
        <h1 className="md:text-[18px] text-[12px]">{`${props.city} - ${props.district}, ${props.province}, ID ${props.postalCode}`}</h1>
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

  const [addressData, setAddressData] = useState<IAddress[]>(props.addressData);
  const [newAddress, setNewAddress] = useState<string>("");

  const updateNewAddress = (newAddress: string) => {
    setNewAddress(newAddress);
  };

  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[600px] w-[99%]">
      <div className="pb-3">
        <h1 className="text-[20px] ml-1">Address Select</h1>
      </div>
      <div className="flex flex-col gap-6 pt-6 overflow-y-scroll h-[80%] pb-8">
        {addressData.map((data, index) => (
          <IndividualAddress
            key={index}
            id={data.id}
            address={data.detail}
            province={data.province}
            city={data.sub_district}
            district={data.district}
            postalCode={data.zip_code}
            default={data.is_buyer_default}
            currentSelectedAddress={selectedAddress}
            selectAddress={changeSelectedAddressLocal}
            updateNewAddress={updateNewAddress}
          />
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text="Select Address"
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
          disabled={selectedAddress === 0}
          onClick={() => {
            props.updateAddress(selectedAddress, newAddress);
            props.submitAddressFunction();
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutAddressModal;
