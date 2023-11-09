import React from "react";
import Button from "../Button";
import { useRouter } from "next/router";

interface MobileUserProfileSidebarProps {
  currentPage?: string;
}

const MobileUserProfileSidebar = (props: MobileUserProfileSidebarProps) => {
  const router = useRouter();

  const redirectMyProfile = () => {
    router.push("/user/profile");
  };

  const redirectChangePassword = () => {
    router.push("/user/profile/changePassword");
  };

  return (
    <div className="bg-[#364968]">
      <div className="flex gap-6 overflow-x-auto mx-[10px] whitespace-nowrap">
        <Button
          text="My Profile"
          onClick={redirectMyProfile}
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "My Profile"}
        />
        <Button
          text="Addresses"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "My Address"}
        />
        <Button
          text="Change Password"
          onClick={redirectChangePassword}
          styling="bg-blue-100 py-[12px] rounded-full w-[250px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Change Password"}
        />
        <Button
          text="My Wallet"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          onClick={() => router.push("/user/wallet")}
        />
        <Button
          text="Purchase History"
          styling="bg-blue-100 py-[12px] rounded-full w-[250px] px-8 hover:bg-blue-300 my-4"
        />
        <Button
          text="My Vouchers"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
        />
      </div>
    </div>
  );
};

export default MobileUserProfileSidebar;
