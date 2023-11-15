import React, { ReactNode } from "react";
import UserProfileSidebar from "../UserProfileSidebar";
import Navbar from "../Navbar";
import SellerAdminSidebar from "../SellerAdminSidebar";
import { useRouter } from "next/router";
import Button from "../Button";

interface IProfileLayout {
  children: ReactNode;
  currentPage?: string;
}

interface MobileSellerAdminSidebarProps {
  currentPage?: string;
}

const MobileSellerAdminSidebar = (props: MobileSellerAdminSidebarProps) => {
  const router = useRouter();

  return (
    <div className="bg-[#364968]">
      <div className="flex gap-6 overflow-x-auto mx-[10px] whitespace-nowrap">
        <Button
          text="Promotions"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Promotions"}
        />
        <Button
          text="Configure Delivery"
          styling="bg-blue-100 py-[12px] rounded-full w-[350px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Configure"}
        />
        <Button
          text="Delivery List"
          styling="bg-blue-100 py-[12px] rounded-full w-[250px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "List of Orders"}
        />
        <Button
          text="Process Delivery"
          styling="bg-blue-100 py-[12px] rounded-full w-[350px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Process Orders"}
        />
      </div>
    </div>
  );
};

const SellerAdminLayout = ({ children, currentPage }: IProfileLayout) => {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="flex md:flex-row flex-col h-full">
          <div className="md:block hidden">
            <SellerAdminSidebar />
          </div>
          <div className=" md:hidden">
            <MobileSellerAdminSidebar currentPage={currentPage} />
          </div>
          <div className="w-full md:mx-0 mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdminLayout;
