import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import { FaTag, FaDollyFlatbed, FaBox } from "react-icons/fa";
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
          text="Products"
          styling="bg-blue-100 py-[12px] rounded-full w-[150px] px-8 hover:bg-blue-300 my-4"
          disabled={props.currentPage === "Products"}
        />
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

const SellerAdminSidebar = () => {
  const router = useRouter();

  return (
    <div className="bg-[#364968] h-full px-8">
      <div className="username-section pt-5">
        <div className="flex justify-center gap-4 bg-[#29374e] py-4 px-6 rounded-[15px]">
          <h1 className="text-white text-[20px]">Seller Admin Panel</h1>
        </div>
      </div>
      <div className="remaining-section text-white mt-[20px] pt-4">
        <div className="pl-[26px] border-slate-300 border-b-2 pb-[20px]">
          <h1
            onClick={() => router.push("/myshop/products")}
            className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer transition w-[200px] hover:text-[#92bcff]"
          >
            <FaBox />
            Products
          </h1>
        </div>
        <div className="pl-[26px] border-slate-300 border-b-2 pb-[20px]">
          <h1
            onClick={() => router.push("/myshop/promotions")}
            className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer transition w-[200px] hover:text-[#92bcff]"
          >
            <FaTag />
            Promotions
          </h1>
        </div>
      </div>

      <div className="options-section text-white mt-[30px] pl-[24px] border-slate-300 border-b-2 pb-5">
        <h1 className="text-[20px] flex items-center gap-4">
          <FaDollyFlatbed />
          Delivery Service
        </h1>
        <ul className="text-[14px] ml-[38px]">
          <li
            className={`py-1 hover:cursor-pointer w-[80px] hover:text-[#92bcff] transition`}
          >
            Configure
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[90px] hover:text-[#92bcff] transition`}
          >
            List of orders
          </li>
          <li
            className={`py-1 hover:cursor-pointer w-[150px] hover:text-[#92bcff] transition`}
          >
            Process orders
          </li>
        </ul>
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
