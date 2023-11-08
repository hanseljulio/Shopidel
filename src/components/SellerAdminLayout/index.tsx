import React, { ReactNode } from "react";
import UserProfileSidebar from "../UserProfileSidebar";
import MobileUserProfileSidebar from "../MobileUserProfileSidebar";
import Navbar from "../Navbar";
import SellerAdminSidebar from "../SellerAdminSidebar";

interface IProfileLayout {
  children: ReactNode;
  currentPage?: string;
}

const SellerAdminLayout = ({ children, currentPage }: IProfileLayout) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex mobile:flex-col h-full">
          <div className="mobile:hidden">
            <SellerAdminSidebar />
          </div>
          {/* <div className="invisible hidden mobile:visible mobile:block">
            <MobileUserProfileSidebar currentPage={currentPage} />
          </div> */}
          <div className="w-full mobile:mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdminLayout;
