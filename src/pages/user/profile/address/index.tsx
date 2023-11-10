import React, { useState, useEffect } from "react";
import ProfileLayout from "@/components/ProfileLayout";
import Button from "@/components/Button";
import { IAddress } from "@/interfaces/user_interface";
import { API } from "@/network";
import { getCookie } from "cookies-next";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAPIResponse } from "@/interfaces/api_interface";
import axios from "axios";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";

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

interface IProvinceDistrictData {
  id: number;
  name: string;
}

interface IDropdownProps {
  label: string;
  data: IProvinceDistrictData[];
  onChange: (e: any) => void;
}

interface IAddAddressModal {
  closeFunction: () => void;
}

const AddressDropdown = (props: IDropdownProps) => {
  return (
    <div>
      <p className="pb-2">{props.label}</p>
      <select
        onChange={(e) => props.onChange(e)}
        className={`p-4 w-[450px] mobile:w-full rounded`}
        name="category-dropdown"
      >
        {props.data.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

const AddAddressModal = (props: IAddAddressModal) => {
  const [provinceData, setProvinceData] = useState<IProvinceDistrictData[]>([]);
  const [districtData, setDistrictData] = useState<IProvinceDistrictData[]>([]);
  const [currentSelectedProvinceId, setCurrentSelectedProvinceId] =
    useState<number>(1);
  const [currentSelectedDistrictId, setCurrentSelectedDistrictId] =
    useState<number>(1);
  const [districtIndex, setDistrictIndex] = useState<number>(0);

  const [detail, setDetail] = useState<string>("");
  const [subDistrict, setSubDistrict] = useState<string>("");
  const [kelurahan, setKelurahan] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const router = useRouter();
  const { updateUser } = useUserStore();

  const getProvinceData = async () => {
    try {
      const response = await API.get("/address/provinces");

      setProvinceData(response.data.data.provinces);
    } catch (e) {
      console.log(e);
    }
  };

  const getDistrictData = async () => {
    try {
      const response = await API.get(
        `/address/provinces/${currentSelectedProvinceId}/districts`
      );

      setDistrictData(response.data.data.districts);
      setCurrentSelectedDistrictId(
        response.data.data.districts[districtIndex].id
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProvinceData();
  }, []);

  useEffect(() => {
    getDistrictData();
  }, [currentSelectedProvinceId]);

  const submit = async (e: any) => {
    e.preventDefault();

    if (
      subDistrict === "" ||
      kelurahan === "" ||
      postalCode === "" ||
      detail === ""
    ) {
      toast.error("All fields must be filled!");
      return;
    }

    const sendData = {
      province_id: parseInt(currentSelectedProvinceId.toString()),
      district_id: parseInt(currentSelectedDistrictId.toString()),
      sub_district: subDistrict,
      kelurahan: kelurahan,
      zip_code: postalCode,
      detail: detail,
    };

    try {
      toast.promise(
        API.post("/accounts/address", sendData),
        {
          pending: "Adding address...",
          success: {
            render() {
              props.closeFunction();
              return "Address successfully updated!";
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
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-md w-[1000px] h-[600px] mobile:w-fit mobile:overflow-y-scroll">
      <div className="pb-3">
        <h1 className="text-[20px]">Add New Address</h1>
      </div>

      <div className="pt-6">
        <Input
          label="Address"
          type="text"
          name="address"
          width="w-full "
          onChange={(e) => setDetail(e.target.value)}
          required
        />
        <div className="flex justify-between pt-6 mobile:flex-col mobile:gap-6">
          <AddressDropdown
            label="Province"
            data={provinceData}
            onChange={(e) => setCurrentSelectedProvinceId(e.target.value)}
          />
          <AddressDropdown
            label="District"
            data={districtData}
            onChange={(e) => {
              setCurrentSelectedDistrictId(e.target.value);
              setDistrictIndex(e.target.selectedIndex);
            }}
          />
        </div>
        <div className="flex justify-between pt-6 mobile:flex-col mobile:gap-6">
          <Input
            label="Sub-district"
            type="text"
            name="subdistrict"
            width="basis-[33%] mobile:w-full"
            onChange={(e) => setSubDistrict(e.target.value)}
            required
          />
          <Input
            label="Kelurahan"
            type="text"
            name="kelurahan"
            width="basis-[33%] mobile:w-full"
            onChange={(e) => setKelurahan(e.target.value)}
            required
          />
          <Input
            label="Zip Code"
            type="text"
            name="zipcode"
            width="basis-[33%] mobile:w-full"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-center mt-[50px]">
        <Button
          text="Add new address"
          onClick={submit}
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

interface IEditAddressModal {
  closeFunction: () => void;
  currentAddressId: number;
}

const EditAddressModal = (props: IEditAddressModal) => {
  const [currentAddressData, setCurrentAddressData] = useState<IAddress>({
    id: 0,
    full_address: "",
    detail: "",
    zip_code: "",
    kelurahan: "",
    sub_district: "",
    district: "",
    province: "",
    is_buyer_default: false,
    is_seller_default: false,
  });
  const [provinceData, setProvinceData] = useState<IProvinceDistrictData[]>([]);
  const [districtData, setDistrictData] = useState<IProvinceDistrictData[]>([]);
  const [currentSelectedProvinceId, setCurrentSelectedProvinceId] =
    useState<number>(1);
  const [currentSelectedDistrictId, setCurrentSelectedDistrictId] =
    useState<number>(1);
  const [districtIndex, setDistrictIndex] = useState<number>(0);

  const router = useRouter();
  const { updateUser } = useUserStore();

  const getProvinceData = async () => {
    try {
      const response = await API.get("/address/provinces");

      setProvinceData(response.data.data.provinces);
    } catch (e) {
      console.log(e);
    }
  };

  const getDistrictData = async () => {
    try {
      const response = await API.get(
        `/address/provinces/${currentSelectedProvinceId}/districts`
      );

      setDistrictData(response.data.data.districts);
      setCurrentSelectedDistrictId(
        response.data.data.districts[districtIndex].id
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProvinceData();
  }, []);

  useEffect(() => {
    getDistrictData();
  }, [currentSelectedProvinceId]);

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      toast.promise(
        API.put(`/accounts/address/${props.currentAddressId}`),
        {
          pending: "Adding address...",
          success: {
            render() {
              props.closeFunction();
              return "Address successfully updated!";
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
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-md w-[1000px] h-[600px] mobile:w-fit mobile:overflow-y-scroll">
      <div className="pb-3">
        <h1 className="text-[20px]">Add New Address</h1>
      </div>

      <div className="pt-6">
        <Input
          label="Address"
          type="text"
          name="address"
          width="w-full "
          required
        />
        <div className="flex justify-between pt-6 mobile:flex-col mobile:gap-6">
          <AddressDropdown
            label="Province"
            data={provinceData}
            onChange={(e) => setCurrentSelectedProvinceId(e.target.value)}
          />
          <AddressDropdown
            label="District"
            data={districtData}
            onChange={(e) => {
              setCurrentSelectedDistrictId(e.target.value);
              setDistrictIndex(e.target.selectedIndex);
            }}
          />
        </div>
        <div className="flex justify-between pt-6 mobile:flex-col mobile:gap-6">
          <Input
            label="Sub-district"
            type="text"
            name="subdistrict"
            width="basis-[33%] mobile:w-full"
            required
          />
          <Input
            label="Kelurahan"
            type="text"
            name="kelurahan"
            width="basis-[33%] mobile:w-full"
            required
          />
          <Input
            label="Zip Code"
            type="text"
            name="zipcode"
            width="basis-[33%] mobile:w-full"
            required
          />
        </div>
      </div>
      <div className="flex justify-center mt-[50px]">
        <Button
          text="Add new address"
          onClick={submit}
          styling="bg-[#364968] p-3 rounded-[8px] w-[200px] text-white my-4"
        />
      </div>
    </div>
  );
};

const AddressPage = () => {
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const router = useRouter();
  const { updateUser } = useUserStore();
  const [showAddAddressModal, setShowAddAddressModal] =
    useState<boolean>(false);

  const getAddressData = async () => {
    try {
      const response = await API.get("/accounts/address");

      setAddressData(response.data.data);
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
    getAddressData();
  }, []);

  const setNewDefault = async (id: number) => {
    const currentData = addressData;
    currentData.forEach((data) => (data.is_buyer_default = false));

    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i].id === id) {
        currentData[i].is_buyer_default = true;
        setAddressData(currentData);
        break;
      }
    }

    // try {

    //   toast.promise(
    //     API.put(`/accounts/address/${id}`, currentData),
    //     {
    //       pending: "Updating default address...",
    //       success: {
    //         render() {
    //           return "Default address";
    //         },
    //       },
    //       error: {
    //         render({ data }) {
    //           if (axios.isAxiosError(data)) {
    //             return `${(data.response?.data as IAPIResponse).message}`;
    //           }
    //         },
    //       },
    //     },
    //     {
    //       autoClose: 1500,
    //     }
    //   );

    // } catch (e) {
    //   if (axios.isAxiosError(e)) {
    //     if (e.response?.status === 401) {
    //       return clientUnauthorizeHandler(router, updateUser);
    //     }
    //     return toast.error(e.message, {
    //       autoClose: 1500,
    //     });
    //   }
    // }

    getAddressData();
  };

  const closeAddAddress = () => {
    setShowAddAddressModal(false);
    getAddressData();
  };

  return (
    <>
      {showAddAddressModal && (
        <Modal
          content={<AddAddressModal closeFunction={closeAddAddress} />}
          onClose={() => setShowAddAddressModal(false)}
        />
      )}

      <div className="overflow-hidden">
        <ToastContainer />
        <ProfileLayout currentPage="My Address">
          <div className="w-full mx-auto mt-6 ">
            <div className="flex items-center justify-between pl-[50px] pr-[65px] mobile:flex-col mobile:p-0">
              <h1 className="text-[30px]">Manage Address</h1>

              <Button
                text="Add new address"
                onClick={() => setShowAddAddressModal(true)}
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
