import React from "react";
import ProfileLayout from "@/components/ProfileLayout";
import Button from "@/components/Button";

interface IIndividualAddressProps {
  default?: boolean;
}

const IndividualAddress = (props: IIndividualAddressProps) => {
  return (
    <div className="border-2 p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">
            Hansel Julio <span className="font-normal">| 081519799999</span>
          </h1>
          <h1>
            Metro Permata 1, Jalan Metro Permata, Karang Tengah (Blok L5 no 26)
          </h1>
          <h1>KARANG TENGAH, KOTA TANGERANG, BANTEN, ID, 15157</h1>
        </div>
        <div className="text-right flex flex-col gap-3">
          <div className="flex justify-end gap-2 px-2">
            <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
              Edit
            </h1>
            <h1>|</h1>
            <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
              Delete
            </h1>
          </div>
          <h1 className="p-2 bg-slate-200">Set as Default</h1>
        </div>
      </div>
      {props.default && <h1 className="text-orange-600">[DEFAULT]</h1>}
    </div>
  );
};

const AddressPage = () => {
  return (
    <div className="overflow-hidden">
      <ProfileLayout currentPage="My Address">
        <div className="w-full mx-auto mt-6 ">
          <div className="flex items-center justify-between pl-[50px] pr-[65px]">
            <h1 className="text-[30px]">Manage Address</h1>

            <Button
              text="Add new address"
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] mobile:w-[100px] my-4"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 overflow-y-scroll h-screen px-[50px] pt-[30px] pb-[250px]">
          <IndividualAddress default />
          <IndividualAddress default />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
          <IndividualAddress />
        </div>
      </ProfileLayout>
    </div>
  );
};

export default AddressPage;
