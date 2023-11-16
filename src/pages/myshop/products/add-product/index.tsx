import React, { useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import Input from "@/components/Input";
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
import {
  IoAdd,
  IoAddCircle,
  IoAddCircleOutline,
  IoAddCircleSharp,
  IoClose,
} from "react-icons/io5";

interface IVariants {
  color: string;
  size: string;
  quantity: number;
  price: number;
}

interface ICategory {
  id: number;
  name: string;
  children?: ICategory[];
}

const categoryDummy = [
  {
    id: 984,
    name: "Rumah Tangga",
    children: [
      {
        id: 993,
        name: "Dekorasi",
        children: [
          {
            id: 3741,
            name: "Cover Kipas Angin",
          },
          {
            id: 3740,
            name: "Cover Kursi",
          },
          {
            id: 3739,
            name: "Hiasan Dinding",
          },
          {
            id: 3738,
            name: "Hiasan Natal",
          },
        ],
      },
      {
        id: 992,
        name: "Furniture",
        children: [
          {
            id: 3737,
            name: "Bedside Table",
          },
          {
            id: 3736,
            name: "Cermin Badan",
          },
          {
            id: 3735,
            name: "Kasur",
          },
          {
            id: 3734,
            name: "Kursi",
          },
        ],
      },
    ],
  },
  {
    id: 983,
    name: "Komputer & Laptop",
    children: [
      {
        id: 3844,
        name: "Laptop",
        children: [
          {
            id: 3989,
            name: "Laptop 2 in 1",
          },
          {
            id: 3982,
            name: "Laptop Consumer",
          },
          {
            id: 3986,
            name: "Notebook",
          },
          {
            id: 3984,
            name: "Ultrabook",
          },
        ],
      },
      {
        id: 3841,
        name: "Monitor",
        children: [
          {
            id: 3957,
            name: "Monitor LCD",
          },
          {
            id: 3958,
            name: "Monitor LED",
          },
          {
            id: 3954,
            name: "Monitor Tabung",
          },
        ],
      },
    ],
  },
];

interface IAddProductForm {
  product_name: string;
  category: ICategory;
  description: string;
  variants: IVariant[];
}

interface IVariant {
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
      variants: [],
    },
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category2, setCategory2] = useState<ICategory[]>([]);
  const [category3, setCategory3] = useState<ICategory[]>([]);

  const watchCategory = watch("category");
  const watchVariant = watch("variants");

  const addVariants = (e: any) => {};

  return (
    <SellerAdminLayout currentPage="Products">
      <div className="p-5">
        <div className="flex items-center md:flex-row justify-between  md:gap-0 flex-col gap-6">
          <h1 className="text-[30px]">Add Products</h1>
        </div>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-y-5 w-[50%]">
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
                      {categoryDummy.map((l1, i) => {
                        return (
                          <div
                            key={i}
                            className={`py-1 px-3 hover:cursor-pointer flex items-center justify-between hover:bg-slate-100 hover:rounded transition`}
                            onClick={() => {
                              setCategory2(l1.children);
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
                                setCategory3(l2.children!);
                              }}
                            >
                              <p>{l2.name}</p>
                              <FaChevronRight size={10} />
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
                <h1 className="text-xl">Variants</h1>
                <Button
                  text="Add Variants"
                  onClick={(e) => {
                    e.preventDefault();
                    setValue("variants", [
                      ...watchVariant,
                      {
                        name: "",
                        type: [],
                      },
                    ]);
                  }}
                  styling="bg-[#364968] rounded-md w-fit p-2 text-white "
                />
              </div>
              <div className="mt-3 flex flex-col gap-y-5">
                {watchVariant &&
                  watchVariant.map((variant, i) => {
                    return (
                      <ProductVariant
                        key={i}
                        i={i}
                        register={register}
                        watchVariant={watchVariant}
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
                        {getValues("variants").map((v, i) => {
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
                    <tbody>
                      {getValues("variants")
                        .at(0)
                        ?.type.map((v0, i) => {
                          if (getValues("variants").length === 1) {
                            return (
                              <tr key={i}>
                                <td></td>
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
                          return getValues("variants")
                            .at(1)
                            ?.type.map((v1, i) => {
                              return (
                                <tr key={i}>
                                  <td></td>
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
  watchVariant: IVariant[];
  setValue: UseFormSetValue<IAddProductForm>;
  getValues: UseFormGetValues<IAddProductForm>;
  i: number;
}
const ProductVariant = ({
  register,
  setValue,
  getValues,
  watchVariant,
  i,
}: IProductVariantProps) => {
  const [variantType, setVariantType] = useState<string>("");

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-bold">Variant {i + 1}</p>
        <div
          onClick={() => {
            let temp = watchVariant;
            temp.splice(i, 1);
            setValue(`variants`, temp);
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
            {...register(`variants.${i}.name`)}
            type="text"
            name={`variants.${i}.name`}
            placeholder="Ex: Color"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                console.log("enter");
              }
            }}
            id={`variants.${i}.name`}
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
                  setValue(`variants.${i}.type`, [
                    ...getValues(`variants.${i}.type`),
                    variantType,
                  ]);
                  setVariantType("");
                }
              }}
              className="rounded-md w-full"
            />
            {variantType.length !== 0 && (
              <div
                onClick={() => {
                  setValue(`variants.${i}.type`, [
                    ...getValues(`variants.${i}.type`),
                    variantType,
                  ]);
                  setVariantType("");
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
              {watchVariant.at(i)?.type &&
                watchVariant.at(i)?.type.map((type, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setValue(
                          `variants.${i}.type`,
                          getValues(`variants.${i}.type`).filter(
                            (item) => item !== type
                          )
                        );
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
//   variantsData.map((_, index) => {
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
//                 let currentData = variantsData;
//                 currentData[index].size = e.target.value;

//                 setVariantsData(currentData);
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
//                 let currentData = variantsData;
//                 currentData[index].color = e.target.value;

//                 setVariantsData(currentData);
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
//                 let currentData = variantsData;
//                 currentData[index].quantity = parseInt(e.target.value);

//                 setVariantsData(currentData);
//               }}
//             />
//           </div>
//           <div className="flex items-center gap-6">
//             <p className="font-bold">Price (Rp)</p>
//             <input
//               type="number"
//               className={`p-4 w-[188px] h-14 rounded`}
//               onChange={(e) => {
//                 let currentData = variantsData;
//                 currentData[index].price = parseInt(e.target.value);

//                 setVariantsData(currentData);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   });
// }
