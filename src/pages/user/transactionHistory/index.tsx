import ProfileLayout from "@/components/ProfileLayout";
import React, { useState } from "react";

const TransactionHistory = () => {
  const [sortBy, setSortBy] = useState<string>("all");
  const orderStatus = [
    "All",
    "On Process",
    "Delivered",
    "Completed",
    "Cancelled",
  ];

  return (
    <div>
      <ProfileLayout currentPage="Transaction History">
        <div className="w-full mx-auto mt-6 ">
          <div className="flex items-center justify-between md:flex-row md:pl-[50px] md:pr-[65px] flex-col p-0 md:gap-0 gap-8">
            <h1 className="text-[30px]">Transaction History</h1>
            <div className="flex items-center gap-6">
              <p>Sort By</p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className={`p-4 w-[200px] rounded`}
                name="category-dropdown"
              >
                {orderStatus.map((option, index) => (
                  <option
                    key={index}
                    value={option.replace(/\s+/g, "").toLowerCase()}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default TransactionHistory;
