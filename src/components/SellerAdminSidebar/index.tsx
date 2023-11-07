import React from "react";
import { FaTag, FaDollyFlatbed } from "react-icons/fa";
import { useRouter } from "next/router";

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
          <h1 className="text-[20px] flex items-center gap-4 mt-[20px] hover:cursor-pointer transition w-[200px] hover:text-[#92bcff]">
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

export default SellerAdminSidebar;
