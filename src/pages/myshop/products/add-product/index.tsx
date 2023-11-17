import React, { useEffect, useRef, useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import {
  SubmitHandler,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { API } from "@/network";
import Button from "@/components/Button";
import { MdDelete } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { IoAddCircleOutline, IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { ICategory } from "@/interfaces/product_interface";
import {
  IAPICategoriesResponse,
  IAPIResponse,
} from "@/interfaces/api_interface";

interface IAddProductForm {
  product_name: string;
  category: ICategory;
  description: string;
  variantGroup: IVariantGroup[];
  variantTable: IVariant[];
}

interface IVariant {
  id: number;
  variant1: {
    name: string;
    value: string;
  };
  variant2?: {
    name: string;
    value: string;
  };
  stock: number;
  price: string;
  imageId: string;
}

interface IVariantGroup {
  name: string;
  type: string[];
}

const SellerAddProductPage = () => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IAddProductForm>({
    mode: "onBlur",
    defaultValues: {
      variantGroup: [],
    },
  });
  const [categories, setCategories] = useState<ICategory[]>();
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category2, setCategory2] = useState<ICategory[]>([]);
  const [category3, setCategory3] = useState<ICategory[]>([]);

  const watchCategory = watch("category");
  const watchVariantGroup = watch("variantGroup");
  const watchVariantTable = watch("variantTable");

  const imageRef = useRef<HTMLInputElement>(null);
  const variantRef = useRef<IVariant[]>([]);

  const addTest = (data: IVariant) => {
    variantRef.current.push(data);
  };

  const getListCategory = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(
        (res.data as IAPIResponse<IAPICategoriesResponse>).data?.categories
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching categories", {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    if (watchVariantTable !== undefined) {
      console.log(watchVariantTable);
    }
  }, [watchVariantGroup]);

  return (
    <SellerAdminLayout currentPage="Products">
      <div className="p-5">
        <div className="flex items-center md:flex-row justify-between  md:gap-0 flex-col gap-6">
          <h1 className="text-[30px]">Add Products</h1>
        </div>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-y-5 w-[75%]">
            <div className="flex flex-col">
              <p>Product name</p>
              <input
                className="rounded-md w-full"
                {...register("product_name", {
                  required: "Product name is required",
                })}
                type="text"
              />
              {errors.product_name?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.product_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <p>Product Description</p>
              <textarea
                className="w-full rounded-md"
                {...register("description", {
                  required: "Product description is required",
                })}
              />
              {errors.description?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  Product description is required
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <p>Category</p>
              <div className="relative w-full">
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  type="text"
                  name="category"
                  id="category"
                  className={`${
                    isCategoryOpen ? "rounded-t-md" : "rounded-md"
                  } hover:cursor-pointer w-full`}
                  placeholder="Select category"
                  value={watchCategory && watchCategory.name}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  readOnly
                />
                {isCategoryOpen && (
                  <div className="absolute z-50 text-sm w-full h-80 flex border border-x-slate-500 border-b-slate-500 shadow-md  bg-white py-3 rounded-bl-md rounded-br-md">
                    <div className="flex-1 border-r  overflow-auto">
                      {categories?.map((l1, i) => {
                        return (
                          <div
                            key={i}
                            className={`py-1 px-3 hover:cursor-pointer flex items-center justify-between hover:bg-slate-100 hover:rounded transition`}
                            onClick={() => {
                              setCategory2(l1.children!);
                              setCategory3([]);
                            }}
                          >
                            <p>{l1.name}</p>
                            <FaChevronRight size={10} />
                          </div>
                        );
                      })}
                    </div>
                    {category2.length !== 0 && (
                      <div className="flex-1 border-r overflow-auto">
                        {category2.map((l2, i) => {
                          return (
                            <div
                              key={i}
                              className="py-1 px-3 hover:cursor-pointer flex items-center justify-between hover:bg-slate-100 hover:rounded transition"
                              onClick={() => {
                                if (l2.children !== undefined) {
                                  return setCategory3(l2.children!);
                                }
                                setValue("category", l2);
                                return setIsCategoryOpen(false);
                              }}
                            >
                              <p>{l2.name}</p>
                              {l2.children && <FaChevronRight size={10} />}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {category3.length !== 0 && (
                      <div className="flex-1 overflow-auto">
                        {category3.map((l3, i) => {
                          return (
                            <div
                              key={i}
                              className="py-1 px-3 hover:cursor-pointer hover:bg-slate-100 hover:rounded transition"
                              onClick={() => {
                                setValue("category", l3);
                                setIsCategoryOpen(false);
                              }}
                            >
                              {l3.name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {errors.category?.type === "required" && (
                <p role="alert" className="text-xs text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl">variantGroup</h1>
                <Button
                  text="Add variantGroup"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue("variantGroup", [
                      ...watchVariantGroup,
                      {
                        name: "",
                        type: [],
                      },
                    ]);
                    setValue("variantTable", []);
                  }}
                  styling="bg-[#364968] rounded-md w-fit p-2 text-white "
                />
              </div>
              <div className="mt-3 flex flex-col gap-y-5">
                {watchVariantGroup &&
                  watchVariantGroup.map((variant, i) => {
                    return (
                      <ProductVariant
                        key={i}
                        i={i}
                        register={register}
                        watchVariantGroup={watchVariantGroup}
                        setValue={setValue}
                        getValues={getValues}
                      />
                    );
                  })}
              </div>
              <div className="mt-10">
                <p className="text-xl">Variant Table</p>
                <div>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-start">Image</th>
                        {getValues("variantGroup").map((v, i) => {
                          return (
                            <th key={i} className="text-start">
                              {v.name}
                            </th>
                          );
                        })}
                        <th className="text-start">Price</th>
                        <th className="text-start">Stock</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {watchVariantTable &&
                        watchVariantTable.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td></td>
                              <td>{data.variant1.value}</td>
                              <td>{data.variant2?.value}</td>
                              <td>
                                <input type="text" name="" id="" />
                              </td>
                              <td>
                                <input type="number" name="" id="" />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody> */}
                    <tbody>
                      {watchVariantGroup.at(0)?.type.map((v0, i) => {
                        if (watchVariantGroup.length === 1) {
                          return (
                            <tr
                              key={i}
                              ref={(element) => {
                                return addTest({
                                  id: i,
                                  imageId: "dsadsa",
                                  price: "20202",
                                  stock: 0,
                                  variant1: {
                                    name: watchVariantGroup.at(0)?.name ?? "",
                                    value: v0,
                                  },
                                });
                              }}
                            >
                              <td>
                                <input
                                  ref={imageRef}
                                  type="file"
                                  onChange={(e) => {
                                    console.log(e.target.files![0]);
                                  }}
                                  name=""
                                  id=""
                                  hidden
                                />
                                <div
                                  onClick={() => {
                                    imageRef.current?.click();
                                  }}
                                  className="w-16 h-16 bg-red-200"
                                ></div>
                              </td>
                              <td>{v0}</td>
                              <td>
                                <input
                                  type="text"
                                  name="price"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                    }
                                  }}
                                  id="price"
                                  className="py-1 rounded-md text-sm"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="price"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                    }
                                  }}
                                  id="price"
                                  className="py-1  rounded-md text-sm"
                                />
                              </td>
                            </tr>
                          );
                        }
                        return getValues("variantGroup")
                          .at(1)
                          ?.type.map((v1, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  <input
                                    ref={imageRef}
                                    type="file"
                                    onChange={(e) => {
                                      console.log(e.target.files![0]);
                                    }}
                                    name=""
                                    id=""
                                    hidden
                                  />
                                  <div
                                    onClick={() => {
                                      imageRef.current?.click();
                                    }}
                                    className="w-16 h-16 bg-red-200"
                                  ></div>
                                </td>
                                <td>{v0}</td>
                                <td>{v1}</td>
                                <td>
                                  <input
                                    type="text"
                                    name="price"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                      }
                                    }}
                                    id="price"
                                    className="py-1 rounded-md text-sm"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="price"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                      }
                                    }}
                                    id="price"
                                    className="py-1  rounded-md text-sm"
                                  />
                                </td>
                              </tr>
                            );
                          });
                      })}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() => {
                    console.log([...new Set(variantRef.current)]);
                  }}
                >
                  coba
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default SellerAddProductPage;

interface IProductVariantProps {
  register: UseFormRegister<IAddProductForm>;
  watchVariantGroup: IVariantGroup[];
  setValue: UseFormSetValue<IAddProductForm>;
  getValues: UseFormGetValues<IAddProductForm>;
  i: number;
}
const ProductVariant = ({
  register,
  setValue,
  getValues,
  watchVariantGroup,
  i,
}: IProductVariantProps) => {
  const [variantType, setVariantType] = useState<string>("");

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold">Variant {i + 1}</p>
        <div
          onClick={() => {
            let temp = watchVariantGroup;
            temp.splice(i, 1);
            setValue(`variantGroup`, temp);
            setValue("variantTable", []);
          }}
          className="hover:cursor-pointer"
        >
          <MdDelete color={"red"} size={25} />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-y-2">
        <div className="flex flex-col">
          <label htmlFor="variant1name" className="text-sm">
            Variant name
          </label>
          <input
            {...register(`variantGroup.${i}.name`)}
            type="text"
            name={`variantGroup.${i}.name`}
            placeholder="Ex: Color"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                console.log("enter");
              }
            }}
            id={`variantGroup.${i}.name`}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="variant1type" className="text-sm">
            Variant type
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Ex: Red"
              value={variantType}
              onChange={(e) => {
                setVariantType(e.target.value);
              }}
              id="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setValue(`variantGroup.${i}.type`, [
                    ...getValues(`variantGroup.${i}.type`),
                    variantType,
                  ]);
                  setVariantType("");
                  // if (watchVariantGroup.length === 1) {
                  //   setValue("variantTable", [
                  //     ...getValues("variantTable"),
                  //     {
                  //       imageId: "dsad",
                  //       variant1: {
                  //         name: watchVariantGroup.at(0)?.name,
                  //         value: variantType,
                  //       },
                  //       price: "",
                  //       stock: 0,
                  //     } as IVariant,
                  //   ]);
                  // } else {
                  //   watchVariantGroup.at(0)?.type.forEach((type) => {
                  //     setValue("variantTable", [
                  //       ...getValues("variantTable"),
                  //       {
                  //         imageId: "dsad",
                  //         variant1: {
                  //           name: watchVariantGroup.at(0)?.name,
                  //           value: type,
                  //         },
                  //         variant2: {
                  //           name: watchVariantGroup.at(1)?.name,
                  //           value: variantType,
                  //         },
                  //         price: "",
                  //         stock: 0,
                  //       } as IVariant,
                  //     ]);
                  //   });
                  // }
                }
              }}
              className="rounded-md w-full"
            />
            {variantType.length !== 0 && (
              <div
                onClick={() => {
                  setValue(`variantGroup.${i}.type`, [
                    ...getValues(`variantGroup.${i}.type`),
                    variantType,
                  ]);
                  setVariantType("");
                  // if (watchVariantGroup.length === 1) {
                  //   setValue("variantTable", [
                  //     ...getValues("variantTable"),
                  //     {
                  //       imageId: "dsad",
                  //       variant1: {
                  //         name: watchVariantGroup.at(0)?.name,
                  //         value: variantType,
                  //       },
                  //       price: "",
                  //       stock: 0,
                  //     } as IVariant,
                  //   ]);
                  // }
                }}
                className="absolute w-full border border-slate-500 rounded-b-md bg-white shadow-md p-3 transition hover:bg-slate-100 hover:cursor-pointer"
              >
                <div className="flex items-center gap-x-3">
                  <IoAddCircleOutline size={20} />
                  <p>Add &quot;{variantType}&quot;</p>
                </div>
              </div>
            )}
            <div className="flex gap-x-2 mt-2">
              {watchVariantGroup.at(i)?.type &&
                watchVariantGroup.at(i)?.type.map((type, k) => {
                  return (
                    <div
                      key={k}
                      onClick={() => {
                        setValue(
                          `variantGroup.${i}.type`,
                          watchVariantGroup
                            .at(i)
                            ?.type.filter((v) => v !== type)!
                        );

                        // setValue(
                        //   "variantTable",
                        //   getValues("variantTable").filter(
                        //     (data) => data.variant1.value !== type
                        //   )
                        // );
                      }}
                      className="p-2 rounded-md bg-slate-200 text-sm hover:cursor-pointer flex items-center gap-x-3"
                    >
                      <p>{type}</p>
                      <IoClose />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// {
//   variantGroupData.map((_, index) => {
//     return (
//       <div
//         key={index}
//         className=" bg-slate-300 w-[650px] p-6 border-2 border-gray-400 rounded-md"
//       >
//         <div className="flex items-center gap-10">
//           <div className="flex items-center gap-4">
//             <p className="font-bold">Product Size</p>
//             <select
//               className={`p-4 w-[150px] h-14 rounded`}
//               name="category-dropdown"
//               onChange={(e) => {
//                 let currentData = variantGroupData;
//                 currentData[index].size = e.target.value;

//                 setvariantGroupData(currentData);
//               }}
//             >
//               <option value={"S"}>{"Small"}</option>
//               <option value={"M"}>{"Medium"}</option>
//               <option value={"L"}>{"Large"}</option>
//             </select>
//           </div>
//           <div className="flex items-center gap-6">
//             <p className="font-bold">Product Color</p>
//             <select
//               className={`p-4 w-[120px] h-14 rounded`}
//               name="category-dropdown"
//               onChange={(e) => {
//                 let currentData = variantGroupData;
//                 currentData[index].color = e.target.value;

//                 setvariantGroupData(currentData);
//               }}
//             >
//               <option value={"Blue"}>{"Blue"}</option>
//               <option value={"Black"}>{"Black"}</option>
//               <option value={"Green"}>{"Green"}</option>
//             </select>
//           </div>
//         </div>
//         <br />

//         <div className="flex items-center gap-[69px]">
//           <div className="flex items-center gap-11">
//             <p className="font-bold">Quantity</p>
//             <input
//               type="number"
//               className={`p-4 w-[120px] h-14 rounded`}
//               onChange={(e) => {
//                 let currentData = variantGroupData;
//                 currentData[index].quantity = parseInt(e.target.value);

//                 setvariantGroupData(currentData);
//               }}
//             />
//           </div>
//           <div className="flex items-center gap-6">
//             <p className="font-bold">Price (Rp)</p>
//             <input
//               type="number"
//               className={`p-4 w-[188px] h-14 rounded`}
//               onChange={(e) => {
//                 let currentData = variantGroupData;
//                 currentData[index].price = parseInt(e.target.value);

//                 setvariantGroupData(currentData);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   });
// }
