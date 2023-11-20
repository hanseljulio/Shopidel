import SellerAdminLayout from "@/components/SellerAdminLayout";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";

interface IPromotionCategoryProps {
  currentPage?: string;
  moveCategory: (newPage: string) => void;
}

interface IPromotionTest {
  id: number;
  startDate: string;
  endDate: string;
  name: string;
}

export const promotionDataTest = [
  {
    id: 1,
    startDate: "2023-11-04T09:12:13.880Z",
    endDate: "2023-11-10T09:12:13.880Z",
    name: "Promotion 1 - Ongoing",
  },
  {
    id: 2,
    startDate: "2023-11-15T09:12:13.880Z",
    endDate: "2023-11-20T09:12:13.880Z",
    name: "Promotion 2 - Upcoming",
  },
  {
    id: 3,
    startDate: "2023-11-01T09:12:13.880Z",
    endDate: "2023-11-04T09:12:13.880Z",
    name: "Promotion 3 - Ended",
  },
  {
    id: 4,
    startDate: "2023-11-06T09:12:13.880Z",
    endDate: "2023-11-10T09:12:13.880Z",
    name: "Promotion 4 - Ongoing",
  },
  {
    id: 5,
    startDate: "2023-11-01T09:12:13.880Z",
    endDate: "2023-11-03T09:12:13.880Z",
    name: "Promotion 5 - Ended",
  },
  {
    id: 6,
    startDate: "2023-11-20T09:12:13.880Z",
    endDate: "2023-11-27T09:12:13.880Z",
    name: "Promotion 6 - Upcoming",
  },
];

const SellerAdminHome = () => {
  const [currentPage, setCurrentPage] = useState<string>("all");
  const [promotionData, setPromotionData] = useState<IPromotionTest[]>([]);

  const moveCategory = (newPage: string) => {
    setCurrentPage(newPage);
  };

  const getPromotionData = () => {
    const currentData = promotionDataTest;

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
      <div className="w-full mx-auto mt-10">
        <div className="flex items-center md:flex-row justify-between px-[50px] md:gap-0 flex-col gap-6">
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
            styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] my-4"
          />
        </div>
        <div className="text-center">
          {promotionData.map((data, index) => (
            <h1 key={index}>{`${
              data.name
            } - Start Date: ${data.startDate.substring(
              0,
              10
            )} - End Date: ${data.endDate.substring(0, 10)}`}</h1>
          ))}
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerAdminHome;
