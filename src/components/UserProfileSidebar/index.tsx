import React from "react";
import Image from "next/image";
import { FaUser, FaTag, FaDollarSign } from "react-icons/fa";
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
    <div className="user-profile-sidebar-div ">
      <div className="admin-nav-wrapper fixed bg-[#59AFFF] w-[400px] h-screen">
        <div className="username-section pt-[100px]">
          <div className="flex items-center gap-4 bg-[#2b5dac] py-2 px-3 mx-[50px] rounded-[15px]">
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
        <div className="options-section text-white mt-[30px] mx-[50px] pl-[24px] border-white border-b-2 pb-8">
          <h1 className="text-[25px] flex items-center gap-4">
            <FaUser />
            My Accounts
          </h1>
          <ul className="text-[18px] ml-[45px]">
            <li
              className={`py-1 hover:cursor-pointer w-[80px] hover:text-[#2b5dac]`}
              onClick={redirectMyProfile}
            >
              Profile
            </li>
            <li
              className={`py-1 hover:cursor-pointer w-[90px] hover:text-[#2b5dac]`}
            >
              Addresses
            </li>
            <li
              className={`py-1 hover:cursor-pointer w-[150px] hover:text-[#2b5dac]`}
              onClick={redirectChangePassword}
            >
              Change Password
            </li>
          </ul>
        </div>
        <div className="remaining-section text-white mt-[20px] mx-[50px] ">
          <div className="pl-[24px] border-white border-b-2 pb-[20px]">
            <h1 className="text-[25px] flex items-center gap-4 hover:cursor-pointer w-[250px] hover:text-[#2b5dac]">
              <FaDollarSign />
              Purchase History
            </h1>
          </div>
          <div className="pl-[26px] border-white border-b-2 pb-[20px]">
            <h1 className="text-[25px] flex items-center gap-4 mt-[20px] hover:cursor-pointer w-[200px] hover:text-[#2b5dac]">
              <FaTag />
              My Vouchers
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
