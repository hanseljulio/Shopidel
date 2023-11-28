import React, { ReactNode, useEffect, useState } from "react";
import Button from "../Button";
import Navbar from "../Navbar";
import {
  FaUser,
  FaStar,
  FaDollarSign,
  FaWallet,
  FaHeart,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { IAPIUserProfileResponse } from "@/interfaces/api_interface";

interface IProfileLayout {
  children: ReactNode;
  currentPage?: string;
}

interface MobileUserProfileSidebarProps {
  currentPage?: string;
}

const MobileUserProfileSidebar = (props: MobileUserProfileSidebarProps) => {
  const router = useRouter();

  return (
    <div className="bg-[#364968]">
      <div className="flex gap-6 overflow-x-auto mx-[10px] whitespace-nowrap">
        <Button
          text="My Profile"
          onClick={() => router.push("/user/profile")}
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "My Profile"}
        />
        <Button
          text="Addresses"
          onClick={() => router.push("/user/profile/address")}
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "My Address"}
        />
        <Button
          text="Change Password"
          onClick={() => router.push("/user/profile/change-password")}
          styling="bg-blue-100 py-[12px] rounded-full w-[250px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Change Password"}
        />
        <Button
          text="My Wallet"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          onClick={() => router.push("/user/wallet")}
          disabled={props.currentPage === "My Wallet"}
        />
        <Button
          text="Transaction History"
          styling="bg-blue-100 py-[12px] rounded-full w-[250px] px-8 hover:bg-blue-300 my-4"
          onClick={() => router.push("/user/transaction-history")}
          disabled={props.currentPage === "Transaction History"}
        />
        <Button
          text="Favorite"
          onClick={() => router.push("/favorite")}
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
        />
      </div>
    </div>
  );
};

const UserProfileSidebar = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const [logged, setLogged] = useState<IAPIUserProfileResponse | undefined>();

  useEffect(() => {
    setLogged(user);
  }, [user]);

  return (
    <div className="bg-[#364968] h-full px-5">
      <div className="username-section pt-5">
        <div className="flex items-center gap-4 bg-[#29374e] py-2 px-3 rounded-[15px]">
          <img
            src={
              logged?.profile_picture
                ? logged.profile_picture
                : "/vm2/images/defaultuser.png"
            }
            alt="Nothing"
            width={50}
            height={50}
            className={`w-[50px] h-[50px] bg-white`}
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <h1 className="text-white text-[20px]">{logged?.username}</h1>
        </div>
      </div>
      <div className="options-section text-white mt-[30px] pl-[24px] border-slate-300 border-b-2 pb-5">
        <h1 className="text-[20px] flex items-center gap-4">
          <FaUser />
          My Accounts
        </h1>
        <ul className="text-[14px] ml-[38px]">
          <li
            className={`py-1 hover:cursor-pointer w-[80px] hover:text-[#92bcff] transition`}
            onClick={() => router.push("/user/profile")}
          >
            Profile
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[90px] hover:text-[#92bcff] transition`}
            onClick={() => router.push("/user/profile/address")}
          >
            Addresses
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[150px] hover:text-[#92bcff] transition`}
            onClick={() => router.push("/user/profile/change-password")}
          >
            Change Password
          </li>
        </ul>
      </div>
      <div className="remaining-section text-white mt-[20px]">
        <div className="pl-[24px] border-slate-300 border-b-2 pb-[20px]">
          <h1
            className="text-[20px] flex items-center gap-4 hover:cursor-pointer transition w-[250px] hover:text-[#92bcff]"
            onClick={() => router.push("/user/wallet")}
          >
            <FaWallet />
            My Wallet
          </h1>
        </div>
        <div className="pl-[24px] border-slate-300 border-b-2 pb-[20px]">
          <h1
            onClick={() => router.push("/user/transaction-history")}
            className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer transition w-[250px] hover:text-[#92bcff]"
          >
            <FaDollarSign />
            Transaction History
          </h1>
        </div>
        <div className="pl-[26px] border-slate-300 border-b-2 pb-[20px]">
          <h1
            onClick={() => router.push("/favorite")}
            className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer transition w-[200px] hover:text-[#92bcff]"
          >
            <FaHeart />
            Favorite
          </h1>
        </div>
      </div>
    </div>
  );
};

const ProfileLayout = ({ children, currentPage }: IProfileLayout) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row h-full">
          <div className="hidden md:block">
            <UserProfileSidebar />
          </div>
          <div className=" md:hidden">
            <MobileUserProfileSidebar currentPage={currentPage} />
          </div>
          <div className="w-full md:mx-0 mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
