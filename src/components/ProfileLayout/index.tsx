import React, { ReactNode } from "react";
import UserProfileSidebar from "../UserProfileSidebar";
import MobileUserProfileSidebar from "../MobileUserProfileSidebar";
import Navbar from "../Navbar";

interface IProfileLayout {
  children: ReactNode;
  currentPage?: string;
}

const ProfileLayout = ({ children, currentPage }: IProfileLayout) => {
  return (
    <div>
      <Navbar />
      <div className="flex mobile:flex-col">
        <div className="mobile:hidden">
          <UserProfileSidebar />
        </div>
        <div className="invisible hidden mobile:visible mobile:block">
          <MobileUserProfileSidebar currentPage={currentPage} />
        </div>
        <div className="w-full mobile:mx-auto ">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
