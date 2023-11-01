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
      <div className="mobile:hidden">
        <UserProfileSidebar />
      </div>
      <div className="invisible mobile:visible">
        <MobileUserProfileSidebar currentPage={currentPage} />
      </div>
      <div className="profile-content-div ml-[35vw] pt-[20px] space-y-5 mobile:mx-auto">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
