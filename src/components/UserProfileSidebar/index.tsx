import React from "react";
import Image from "next/image";
import { FaUser, FaTag, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/router";

function UserProfileSidebar() {
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
        <div className="username-section flex items-center gap-6 pt-[100px] ml-[40px]">
          <Image
            src={`/images/defaultuser.png`}
            alt="Nothing"
            width={50}
            height={50}
            className={`w-[50px] h-[50px]`}
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
          <h1 className="text-white text-[30px]">Username</h1>
        </div>
        <div className="options-section text-white pt-[50px] ml-[50px]">
          <h1 className="text-[25px] flex items-center gap-4">
            <FaUser />
            My Accounts
          </h1>
          <ul className="text-[18px] ml-[70px]">
            <li
              className={`py-1 hover:cursor-pointer w-[80px]`}
              onClick={redirectMyProfile}
            >
              Profile
            </li>
            <li className={`py-1 hover:cursor-pointer w-[90px]`}>Addresses</li>
            <li
              className={`py-1 hover:cursor-pointer w-[150px]`}
              onClick={redirectChangePassword}
            >
              Change Password
            </li>
          </ul>
        </div>
        <div className="remaining-section text-white ml-[50px] pt-[50px] ">
          <h1 className="text-[25px] flex items-center gap-4 hover:cursor-pointer w-[250px]">
            <FaDollarSign />
            Purchase History
          </h1>
          <h1 className="text-[25px] flex items-center gap-4 pt-6 hover:cursor-pointer w-[200px]">
            <FaTag />
            My Vouchers
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSidebar;
