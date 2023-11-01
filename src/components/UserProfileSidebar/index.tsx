import React from "react";
import Image from "next/image";
import { FaUser, FaTag, FaDollarSign, FaWallet } from "react-icons/fa";
import { useRouter } from "next/router";

const UserProfileSidebar = () => {
  const router = useRouter();

  const redirectMyProfile = () => {
    router.push("/user/profile");
  };

  const redirectChangePassword = () => {
    router.push("/user/profile/changePassword");
  };

  return (
    <div className="bg-[#364968] w-[400px] h-full">
      <div className="username-section pt-5">
        <div className="flex items-center gap-4 bg-[#29374e] py-2 px-3 mx-[50px] rounded-[15px]">
          <Image
            src={`/images/defaultuser.png`}
            alt="Nothing"
            width={50}
            height={50}
            className={`w-[50px] h-[50px] bg-white`}
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <h1 className="text-white text-[20px]">username</h1>
        </div>
      </div>
      <div className="options-section text-white mt-[30px] mx-[50px] pl-[24px] border-slate-300 border-b-2 pb-8">
        <h1 className="text-[20px] flex items-center gap-4">
          <FaUser />
          My Accounts
        </h1>
        <ul className="text-[14px] ml-[38px]">
          <li
            className={`py-1 hover:cursor-pointer w-[80px] hover:text-[#92bcff]`}
            onClick={redirectMyProfile}
          >
            Profile
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[90px] hover:text-[#92bcff]`}
          >
            Addresses
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[150px] hover:text-[#92bcff]`}
            onClick={redirectChangePassword}
          >
            Change Password
          </li>
        </ul>
      </div>
      <div className="remaining-section text-white mt-[20px] mx-[50px] ">
        <div className="pl-[24px] border-slate-300 border-b-2 pb-[20px]">
          <h1 className="text-[20px] flex items-center gap-4 hover:cursor-pointer w-[250px] hover:text-[#92bcff]" onClick={() => router.push("/user/wallet")}>
            <FaWallet />
            My Wallet
          </h1>
        </div>
        <div className="pl-[24px] border-slate-300 border-b-2 pb-[20px]">
          <h1 className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer w-[250px] hover:text-[#92bcff]">
            <FaDollarSign />
            Purchase History
          </h1>
        </div>
        <div className="pl-[26px] border-slate-300 border-b-2 pb-[20px]">
          <h1 className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer w-[200px] hover:text-[#92bcff]">
            <FaTag />
            My Vouchers
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
