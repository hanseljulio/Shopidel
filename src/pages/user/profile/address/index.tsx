import React, { useState, useEffect } from "react";
import ProfileLayout from "@/components/ProfileLayout";
import Button from "@/components/Button";
import { IAddress } from "@/interfaces/user_interface";
import { API } from "@/network";
import { getCookie } from "cookies-next";

// full_address: string;
// detail: string;
// zip_code: string;
// kelurahan: string;
// sub_district: string;
// district: string;
// province: string;
// is_buyer_default: boolean;

interface IIndividualAddressProps {
  id: number;
  detail: string;
  postalCode: string;
  kelurahan: string;
  subDistrict: string;
  district: string;
  province: string;
  default: boolean;
  setNewDefault: (id: number) => void;
}

const IndividualAddress = (props: IIndividualAddressProps) => {
  return (
    <div className="border-2 p-4">
      <div className="flex justify-between items-center mobile:flex-col mobile:gap-10">
        <div>
          <h1>{props.detail}</h1>
          <h1>{`${props.kelurahan.toUpperCase()}, ${props.subDistrict.toUpperCase()}, ${props.district.toUpperCase()}, ${props.province.toUpperCase()}, ID ${
            props.postalCode
          }`}</h1>
          {props.default && <h1 className="text-orange-500">[DEFAULT]</h1>}
        </div>
        <div className="text-right flex flex-col gap-3 mobile:items-center mobile:gap-6">
          <div className="flex justify-end gap-2 px-2">
            <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
              Edit
            </h1>
            <h1>|</h1>
            <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
              Delete
            </h1>
          </div>
          <h1
            onClick={() => {
              if (!props.default) {
                props.setNewDefault(props.id);
              } else {
                null;
              }
            }}
            className={`px-3 py-1 rounded-full ${
              props.default
                ? "bg-slate-200"
                : "bg-[#fddf97] hover:cursor-pointer"
            }`}
          >
            Set as Default
          </h1>
        </div>
      </div>
    </div>
  );
};

const AddressPage = () => {
  const [addressData, setAddressData] = useState<IAddress[]>([]);

  const getAddressData = async () => {
    try {
      const response = await API.get("/accounts/address", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      setAddressData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddressData();
  }, []);

  const setNewDefault = (id: number) => {
    const currentData = addressData;
    currentData.forEach((data) => (data.is_buyer_default = false));

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].id === id) {
        currentData[i].is_buyer_default = true;
        setAddressData(currentData);
        break;
      }
    }

    getAddressData();
  };

  console.log(addressData);

  return (
    <>
      <div className="overflow-hidden">
        <ProfileLayout currentPage="My Address">
          <div className="w-full mx-auto mt-6 ">
            <div className="flex items-center justify-between pl-[50px] pr-[65px] mobile:flex-col mobile:p-0">
              <h1 className="text-[30px]">Manage Address</h1>

              <Button
                text="Add new address"
                styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] mobile:w-[100px] my-4 mobile:w-[250px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-y-scroll h-screen px-[50px] pt-[30px] pb-[250px] mobile:pb-[380px]">
            {addressData.map((data, index) => (
              <IndividualAddress
                key={index}
                id={data.id}
                detail={data.detail}
                postalCode={data.zip_code}
                kelurahan={data.kelurahan}
                subDistrict={data.sub_district}
                district={data.district}
                province={data.province}
                default={data.is_buyer_default}
                setNewDefault={setNewDefault}
              />
            ))}
          </div>
        </ProfileLayout>
      </div>
    </>
  );
};

export default AddressPage;
