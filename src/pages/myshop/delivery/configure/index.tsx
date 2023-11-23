import SellerAdminLayout from "@/components/SellerAdminLayout";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SellerConfigurePage = () => {
  const [allowPrintShipping, setAllowPrintShipping] = useState<boolean>(false);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user !== undefined && !user.is_seller) {
      router.push("/myshop");
    }
  }, [user]);

  return (
    <SellerAdminLayout currentPage="Configure">
      <div className="w-full mx-auto mt-6">
        <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
          <h1 className="text-[30px]">Delivery Configuration</h1>
        </div>
        <div className="pt-6 md:mx-[5%]">
          <div className="flex gap-6 ">
            <h1>Allow users to print shipping label</h1>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={(e) =>
                    setAllowPrintShipping((prevState) => !prevState)
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerConfigurePage;
