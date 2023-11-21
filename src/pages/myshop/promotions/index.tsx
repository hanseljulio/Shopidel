import SellerAdminLayout from "@/components/SellerAdminLayout";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { ISellerPromotion } from "@/interfaces/seller_interface";

interface IPromotionCategoryProps {
  currentPage?: string;
  moveCategory: (newPage: string) => void;
}

const SellerAdminHome = () => {
  const [currentPage, setCurrentPage] = useState<string>("all");
  const [promotionData, setPromotionData] = useState<ISellerPromotion[]>([
    {
      name: "Promotion 1",
      quota: 10,
      startDate: "2023-11-20T09:12:13.880Z",
      endDate: "2023-11-27T09:12:13.880Z",
      minItems: 2,
      maxItems: 10,
      discountPercentage: 10,
      selectedProducts: [1, 2, 3],
    },
    {
      name: "Promotion 2",
      quota: 10,
      startDate: "2023-11-20T09:12:13.880Z",
      endDate: "2023-11-27T09:12:13.880Z",
      minItems: 2,
      maxItems: 10,
      discountPercentage: 10,
      selectedProducts: [1, 2, 3],
    },
  ]);
  const router = useRouter();

  const moveCategory = (newPage: string) => {
    setCurrentPage(newPage);
  };

  const getPromotionData = () => {
    const currentData = promotionData;

    if (currentPage === "ongoing") {
      const updatedData = currentData.filter((data) => {
        let currentTime = new Date().getTime();
        let endTime = new Date(data.endDate).getTime();
        let startTime = new Date(data.startDate).getTime();
        return currentTime <= endTime && currentTime >= startTime;
      });
      setPromotionData(updatedData);
    } else if (currentPage === "upcoming") {
      const updatedData = currentData.filter((data) => {
        let currentTime = new Date().getTime();
        let startTime = new Date(data.startDate).getTime();
        return currentTime <= startTime;
      });
      setPromotionData(updatedData);
    } else if (currentPage === "ended") {
      const updatedData = currentData.filter((data) => {
        let currentTime = new Date().getTime();
        let endTime = new Date(data.endDate).getTime();
        return endTime <= currentTime;
      });
      setPromotionData(updatedData);
    } else {
      setPromotionData(currentData);
    }
  };

  useEffect(() => {
    getPromotionData();
  }, [currentPage]);

  return (
    <SellerAdminLayout currentPage="Promotions">
      <div className="w-full mx-auto mt-6">
        <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
          <h1 className="text-[30px]">Promotions</h1>
          <div className="flex items-center gap-3">
            <p className="font-bold">Sort by: </p>
            <select
              onChange={(e) => setCurrentPage(e.target.value)}
              className={`p-4 w-[150px] h-14 rounded`}
              name="category-dropdown"
            >
              <option value={"all"}>{"All"}</option>
              <option value={"ongoing"}>{"Ongoing"}</option>
              <option value={"upcoming"}>{"Upcoming"}</option>
              <option value={"ended"}>{"Ended"}</option>
            </select>
          </div>
          <Button
            text="Create new promotion"
            onClick={() => router.push("/myshop/promotions/create")}
            styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] my-4"
          />
        </div>
        <div className="md:mx-[5%] flex flex-col gap-6 pt-4">
          {promotionData.map((data, index) => {
            return (
              <div key={index} className="border-2 border-black p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1>{data.name}</h1>
                    <br />

                    <h1>
                      {data.startDate.substring(0, 10)} to{" "}
                      {data.endDate.substring(0, 10)}
                    </h1>
                    <h1>
                      Min items: {data.minItems === 0 ? "None" : data.minItems}
                    </h1>
                    <h1>
                      Max items: {data.maxItems === 0 ? "None" : data.maxItems}
                    </h1>
                  </div>
                  <div className="text-right flex flex-col md:gap-3 items-end gap-6">
                    <h1>{data.quota} remaining</h1>
                    <div className="flex justify-end gap-2 ">
                      <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
                        Edit
                      </h1>
                      <h1>|</h1>
                      <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
                        Delete
                      </h1>
                    </div>
                    <h1>View Promotion Detail</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerAdminHome;
