import Button from "@/components/Button";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { API } from "@/network";
import { useUserStore } from "@/store/userStore";
import React, { useEffect } from "react";

const SellerSettings = () => {
  const getSellerDetail = async () => {
    try {
    } catch (e) {}
  };

  useEffect(() => {
    getSellerDetail();
  }, []);

  return (
    <SellerAdminLayout currentPage="Settings">
      <div className="p-5">
        <h1 className="text-3xl">Settings</h1>
        <div className="mt-5">
          <div className="flex flex-col w-[50%]">
            <p>Shop Description</p>
            <textarea
              name=""
              id=""
              className="rounded-md w-full h-52 resize-none"
            />
            <div className="self-end mt-2">
              <Button
                text="Submit"
                styling="rounded-md  bg-[#364968] px-4 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerSettings;
