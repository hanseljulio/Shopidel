import React from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import Button from "@/components/Button";

const SellerAdminProducts = () => {
  return (
    <SellerAdminLayout currentPage="Products">
      <div className="w-full mx-auto mt-10">
        <div className="flex items-center md:flex-row justify-between px-[50px] md:gap-0 flex-col gap-6">
          <h1 className="text-[30px]">My Products</h1>

          <Button
            text="Add new product"
            styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] my-4"
          />
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerAdminProducts;
