import React, { ReactNode } from "react";
import UserProfileSidebar from "../UserProfileSidebar";
import MobileUserProfileSidebar from "../MobileUserProfileSidebar";
import Navbar from "../Navbar";

interface IProfileLayout {
  children: ReactNode;
  currentPage?: string;
  username?: string;
}

const ProfileLayout = ({ children, currentPage, username }: IProfileLayout) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex mobile:flex-col h-full">
          <div className="mobile:hidden">
            <UserProfileSidebar username={username} />
          </div>
          <div className="invisible hidden mobile:visible mobile:block">
            <MobileUserProfileSidebar currentPage={currentPage} />
          </div>
          <div className="w-full mobile:mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
