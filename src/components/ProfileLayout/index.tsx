import React, { ReactNode } from "react";
import UserProfileSidebar from "../UserProfileSidebar";
import Button from "../Button";
import Navbar from "../Navbar";
import { useRouter } from "next/router";

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
          text="Wishlist"
          onClick={() => router.push("/wishlist")}
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
        />
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
