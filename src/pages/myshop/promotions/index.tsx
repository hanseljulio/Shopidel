import SellerAdminLayout from "@/components/SellerAdminLayout";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { ISellerPromotion } from "@/interfaces/seller_interface";
import Modal from "@/components/Modal";
import { dateConverter } from "@/utils/utils";

interface IDeletePromoModal {
  closeFunction: () => void;
}

const DeletePromoModal = (props: IDeletePromoModal) => {
  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[180px] w-[99%]">
      <div className="pb-3 text-center">
        <h1 className="text-[20px] ml-1">
          Are you sure you want to delete this promotion?
        </h1>
        <h1>This can&apos;t be undone!</h1>
      </div>

      <div className="flex justify-center mt-3 gap-6">
        <Button
          text="Yes"
          styling="bg-red-600 p-3 rounded-[8px] w-[100px] text-white my-4"
        />
        <Button
          text="No"
          styling="bg-[#364968] p-3 rounded-[8px] w-[100px] text-white my-4"
        />
      </div>
    </div>
  );
};

const OrderDetailModal = () => {
  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Promotion Details</h1>
      </div>
      <div className="pt-4">
        <h1>Name: Promotion 1</h1>
        <h1>Available quota: 10</h1>
      </div>
      <div className="pt-4">
        <h1>Start date: 20 November 2023</h1>

        <h1>End date: 27 November 2023</h1>
      </div>
      <div className="pt-4">
        <h1>Minimum items: 1</h1>
        <h1>Maximum items: None</h1>
        <h1>Discount percentage: 10%</h1>
      </div>
      <div className="pt-4">
        <h1 className="font-bold text-[20px]">
          Promotion available on these products:
        </h1>
        <h1>Product 1</h1>
        <h1>Product 2</h1>
        <h1>Product 3</h1>
      </div>
    </div>
  );
};

const EditPromo = () => {
  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Edit Promotion</h1>
      </div>
      <div className=" pt-6">
        <form>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">
              Promotion Name
            </label>
            <input
              // {...register("name", {
              //   required: "Promotion name is required",
              // })}
              type="text"
              name="name"
              id="name"
              className="rounded-md border p-2"
            />
            {/* {errors.name?.type === "required" && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )} */}
          </div>
          <div className="flex md:flex-row justify-between pt-6 md:gap-10">
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="quota" className="text-sm">
                Promotion quota
              </label>
              <input
                // {...register("quota", {
                //   required: "Promotion quota is required",
                //   validate: {
                //     greaterThanZero: (v) =>
                //       v > 0 || "Quota must be greater than 0",
                //   },
                // })}
                type="number"
                name="quota"
                id="quota"
                className="rounded-md border p-2 "
              />
              {/* {errors.quota?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.quota.message}
                </p>
              )} */}
            </div>
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="startDate" className="text-sm">
                Start Date
              </label>
              <input
                // {...register("startDate", {
                //   required: "Start date is required",
                // })}
                type="date"
                name="startDate"
                id="startDate"
                className="rounded-md border p-2"
              />
              {/* {errors.startDate?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.startDate.message}
                </p>
              )} */}
            </div>
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="endDate" className="text-sm">
                End date
              </label>
              <input
                // {...register("endDate", {
                //   required: "End date is required",
                // })}
                type="date"
                name="endDate"
                id="endDate"
                className="rounded-md border p-2"
              />
              {/* {errors.endDate?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.endDate.message}
                </p>
              )} */}
            </div>
          </div>
          <div className="flex md:flex-row justify-between pt-6 md:gap-10">
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="minItems" className="text-sm">
                Minimum items
              </label>
              <input
                // {...register("minItems", {
                //   required: "Minimum items is required",
                // })}
                type="number"
                name="minItems"
                id="minItems"
                className="rounded-md border p-2 "
              />
              {/* {errors.minItems?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.minItems.message}
                </p>
              )} */}
            </div>
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="maxItems" className="text-sm">
                Maximum items
              </label>
              <input
                // {...register("maxItems", {
                //   required: "Maximum items is required",
                // })}
                type="number"
                name="maxItems"
                id="maxItems"
                className="rounded-md border p-2"
              />
              {/* {errors.maxItems?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.maxItems.message}
                </p>
              )} */}
            </div>
            <div className="flex flex-col md:basis-[33.3%]">
              <label htmlFor="discountPercentage" className="text-sm">
                Discount percentage
              </label>
              <div className="relative">
                <input
                  // {...register("discountPercentage", {
                  //   required: "Discount percentage is required",
                  // })}
                  type="number"
                  name="discountPercentage"
                  id="discountPercentage"
                  className="rounded-md border p-2 w-full"
                />
                <div className="absolute right-0 bg-[#F3F4F5] border border-slate-500 h-full flex items-center px-2 rounded-tr-md rounded-br-md top-0">
                  <span className="">%</span>
                </div>
              </div>
              {/* {errors.discountPercentage?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.discountPercentage.message}
                </p>
              )} */}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center ">
              <h1 className="text-[25px] py-6">Select Products</h1>
              <div className="flex items-center gap-6">
                <input
                  type="checkbox"
                  className="hover:cursor-pointer"
                  // onClick={handleCheckAll}
                  name="allselect"
                />
                <p>Select all</p>
              </div>
            </div>
            <div className="bg-slate-300 h-[300px] overflow-y-scroll flex flex-col items-center">
              {/* {props.shopItems.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border-2 rounded-md  p-6 flex gap-6 items-center my-3 w-[95%]"
                  >
                    <input
                      // onClick={(e) => handleCheck(e, product.id)}
                      type="checkbox"
                      className="hover:cursor-pointer"
                      // checked={product.isChecked}
                    />
                    <h1>{product.name}</h1>
                  </div>
                );
              })} */}
            </div>
          </div>

          <div className="flex justify-center pt-6 py-10">
            <Button
              text="Edit promotion"
              styling="p-3 bg-[#364968] w-[300px] rounded-md text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

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

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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

  const deletePromo = async (id: number) => {
    // Delete here
  };

  return (
    <>
      {showEditModal && (
        <Modal
          content={<EditPromo />}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDetailModal && (
        <Modal
          content={<OrderDetailModal />}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          content={
            <DeletePromoModal closeFunction={() => setShowDeleteModal(false)} />
          }
          onClose={() => setShowDeleteModal(false)}
        />
      )}

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
                      <h1 className="text-[25px]">{data.name}</h1>
                      <br />

                      <h1 className="font-bold">
                        {dateConverter(data.startDate.substring(0, 10))} to{" "}
                        {dateConverter(data.endDate.substring(0, 10))}
                      </h1>
                      <h1>
                        Min items:{" "}
                        {data.minItems === 0 ? "None" : data.minItems}
                      </h1>
                      <h1>
                        Max items:{" "}
                        {data.maxItems === 0 ? "None" : data.maxItems}
                      </h1>
                    </div>
                    <div className="text-right flex flex-col md:gap-3 items-end gap-6">
                      <h1 className="text-[20px]">{data.quota} remaining</h1>
                      <div className="flex justify-end gap-2 ">
                        <h1
                          onClick={() => setShowEditModal(true)}
                          className="text-blue-600 hover:cursor-pointer hover:underline"
                        >
                          Edit
                        </h1>
                        <h1>|</h1>
                        <h1 className="text-blue-600 hover:cursor-pointer hover:underline">
                          Duplicate
                        </h1>
                        <h1>|</h1>
                        <h1
                          onClick={() => setShowDeleteModal(true)}
                          className="text-blue-600 hover:cursor-pointer hover:underline"
                        >
                          Delete
                        </h1>
                      </div>
                      <h1
                        onClick={() => setShowDetailModal(true)}
                        className="text-orange-600 hover:cursor-pointer hover:underline"
                      >
                        View Promotion Detail
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerAdminHome;
