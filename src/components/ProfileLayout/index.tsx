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
