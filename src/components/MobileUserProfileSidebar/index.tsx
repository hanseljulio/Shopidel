import React from "react";
import Button from "../Button";
import { useRouter } from "next/router";

interface MobileUserProfileSidebarProps {
  currentPage?: string;
}

function MobileUserProfileSidebar(props: MobileUserProfileSidebarProps) {
  const router = useRouter();

  const redirectMyProfile = () => {
    router.push("/user/profile");
  };

  const redirectChangePassword = () => {
    router.push("/user/profile/changePassword");
  };

  return (
    <div className="bg-[#59AFFF]">
      <div className="scroll-area-div flex gap-6 overflow-y-auto mx-[10px]">
        <Button
          text="My Profile"
          onClick={redirectMyProfile}
          styling="bg-slate-300 py-[12px] rounded-[8px] w-[150px] hover:bg-blue-600 my-4"
        />
        <Button
          text="Addresses"
          styling="bg-slate-300 py-[12px] rounded-[8px] w-[150px] hover:bg-blue-600 my-4"
        />
        <Button
          text="Change Password"
          onClick={redirectChangePassword}
          styling="bg-slate-300 py-[12px] rounded-[8px] w-[150px] hover:bg-blue-600 my-4"
        />
        <Button
          text="Purchase History"
          styling="bg-slate-300 py-[12px] rounded-[8px] w-[150px] hover:bg-blue-600 my-4"
        />
        <Button
          text="My Vouchers"
          styling="bg-slate-300 py-[12px] rounded-[8px] w-[150px] hover:bg-blue-600 my-4"
        />
      </div>
    </div>
  );
}

export default MobileUserProfileSidebar;
