import React, { useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "@/network";
import Button from "@/components/Button";

interface ITest {
  product_name: string;
  category: string;
  description: string;
  variants: IVariants[];
}

interface IVariants {
  color: string;
  size: string;
  quantity: number;
  price: number;
}

const SellerAddProductPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ITest>({
    mode: "onBlur",
  });

  const [variantsData, setVariantsData] = useState<IVariants[]>([]);

  const addVariants = (e: any) => {
    e.preventDefault();

    let newVariant = {
      color: "Blue",
      size: "S",
      quantity: 0,
      price: 0,
    };

    setVariantsData([...variantsData, newVariant]);
  };

  console.log(variantsData);

  return (
    <>
      <div className="">
        <SellerAdminLayout currentPage="Products">
          <div className="w-full mx-auto mt-10">
            <div className="flex items-center md:flex-row justify-between px-[50px] md:gap-0 flex-col gap-6">
              <h1 className="text-[30px]">Add Products</h1>
            </div>
            <div className="mt-10 px-[50px]">
              <form action="">
                <div>
                  <div className="flex flex-col gap-3">
                    <p>Product name</p>
                    <input
                      className="w-[400px]"
                      {...register("product_name", {
                        required: "Product name is required",
                      })}
                      type="text"
                    />
                  </div>
                  {errors.product_name?.type === "required" && (
                    <p role="alert" className="text-xs text-red-500 mt-1 ">
                      Product name is required
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex flex-col">
                    <p>Product Description</p>
                    <textarea
                      className="w-[600px]"
                      {...register("description", {
                        required: "Product description is required",
                      })}
                    />
                  </div>
                  {errors.description?.type === "required" && (
                    <p role="alert" className="text-xs text-red-500 mt-1">
                      Product description is required
                    </p>
                  )}
                </div>
                <div>
                  <h1 className="text-[20px] font-bold">Variants</h1>
                  <div
                    className={`flex flex-col gap-6 ${
                      variantsData.length !== 0 ? "py-3" : ""
                    }`}
                  >
                    {variantsData.map((_, index) => {
                      return (
                        <div
                          key={index}
                          className=" bg-slate-300 w-[650px] p-6 border-2 border-gray-400 rounded-md"
                        >
                          <div className="flex items-center gap-10">
                            <div className="flex items-center gap-4">
                              <p className="font-bold">Product Size</p>
                              <select
                                className={`p-4 w-[150px] h-14 rounded`}
                                name="category-dropdown"
                                onChange={(e) => {
                                  let currentData = variantsData;
                                  currentData[index].size = e.target.value;

                                  setVariantsData(currentData);
                                }}
                              >
                                <option value={"S"}>{"Small"}</option>
                                <option value={"M"}>{"Medium"}</option>
                                <option value={"L"}>{"Large"}</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-6">
                              <p className="font-bold">Product Color</p>
                              <select
                                className={`p-4 w-[120px] h-14 rounded`}
                                name="category-dropdown"
                                onChange={(e) => {
                                  let currentData = variantsData;
                                  currentData[index].color = e.target.value;

                                  setVariantsData(currentData);
                                }}
                              >
                                <option value={"Blue"}>{"Blue"}</option>
                                <option value={"Black"}>{"Black"}</option>
                                <option value={"Green"}>{"Green"}</option>
                              </select>
                            </div>
                          </div>
                          <br />

                          <div className="flex items-center gap-[69px]">
                            <div className="flex items-center gap-11">
                              <p className="font-bold">Quantity</p>
                              <input
                                type="number"
                                className={`p-4 w-[120px] h-14 rounded`}
                                onChange={(e) => {
                                  let currentData = variantsData;
                                  currentData[index].quantity = parseInt(
                                    e.target.value
                                  );

                                  setVariantsData(currentData);
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-6">
                              <p className="font-bold">Price (Rp)</p>
                              <input
                                type="number"
                                className={`p-4 w-[188px] h-14 rounded`}
                                onChange={(e) => {
                                  let currentData = variantsData;
                                  currentData[index].price = parseInt(
                                    e.target.value
                                  );

                                  setVariantsData(currentData);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    text="Add Variants"
                    onClick={addVariants}
                    styling="bg-[#364968] p-3 rounded-[8px] w-[150px] text-white my-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </SellerAdminLayout>
      </div>
    </>
  );
};

export default SellerAddProductPage;
