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
import { ToastContainer, toast } from "react-toastify";
import { ICategory } from "@/interfaces/product_interface";
import {
  IAPICategoriesResponse,
  IAPIResponse,
} from "@/interfaces/api_interface";
import "react-toastify/dist/ReactToastify.css";

interface IAddProductForm {
  product_name: string;
  category: ICategory;
  description: string;
  variantGroup: IVariantGroup[];
  variantTable: IVariant[];
}

interface IVariant {
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

  const onSubmit: SubmitHandler<IAddProductForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getListCategory();
  }, []);

  return (
    <>
      <ToastContainer />
      <SellerAdminLayout currentPage="Products">
        <div className="p-5">
          <div className="flex items-center md:flex-row justify-between  md:gap-0 flex-col gap-6">
            <h1 className="text-[30px]">Add Products</h1>
          </div>
          <div className="mt-10">
            <form
              action=""
              className="flex flex-col gap-y-5 w-[75%]"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  <div>
                    <h1 className="text-xl">Variants</h1>
                    <p className="text-xs">
                      Add your product variant (optional)
                    </p>
                  </div>
                  {watchVariantGroup.length < 2 && (
                    <Button
                      text="Add Variant"
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
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-y-5">
                  {watchVariantGroup &&
                    watchVariantGroup.map((_, i) => {
                      return (
                        <ProductVariantGroup
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
                {watchVariantGroup.length !== 0 && (
                  <div className="mt-10">
                    <div>
                      <p className="text-xl">Variant Table</p>
                      <p className="text-xs">
                        Configure each product variant image, price, and stock
                      </p>
                    </div>
                    <div className="mt-2">
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
                        <tbody>
                          {getValues("variantGroup")
                            .at(0)
                            ?.type.map((v0, i) => {
                              if (getValues("variantGroup").length === 1) {
                                return (
                                  <ProductVariant
                                    watchVariantTable={watchVariantTable}
                                    key={i}
                                    variant1type={v0}
                                    getValues={getValues}
                                    setValue={setValue}
                                    watchVariantGroup={watchVariantGroup}
                                  />
                                );
                              }
                              return getValues("variantGroup")
                                .at(1)
                                ?.type.map((v1, i) => {
                                  return (
                                    <ProductVariant
                                      watchVariantTable={watchVariantTable}
                                      key={i}
                                      getValues={getValues}
                                      setValue={setValue}
                                      watchVariantGroup={watchVariantGroup}
                                      variant1type={v0}
                                      variant2type={v1}
                                    />
                                  );
                                });
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <Button text="Test" />
              </div>
            </form>
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerAddProductPage;

interface IProductVariantGroupProps {
  register: UseFormRegister<IAddProductForm>;
  watchVariantGroup: IVariantGroup[];
  setValue: UseFormSetValue<IAddProductForm>;
  getValues: UseFormGetValues<IAddProductForm>;
  i: number;
}
const ProductVariantGroup = ({
  register,
  setValue,
  getValues,
  watchVariantGroup,
  i,
}: IProductVariantGroupProps) => {
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
                  if (
                    watchVariantGroup
                      .at(i)
                      ?.type.findIndex(
                        (data) =>
                          data.toLowerCase() === variantType.toLowerCase()
                      ) === -1
                  ) {
                    setValue(`variantGroup.${i}.type`, [
                      ...getValues(`variantGroup.${i}.type`),
                      variantType,
                    ]);
                    setVariantType("");
                  }
                }
              }}
              className="rounded-md w-full"
            />
            {variantType.length !== 0 && (
              <div
                onClick={() => {
                  if (
                    watchVariantGroup
                      .at(i)
                      ?.type.findIndex(
                        (data) =>
                          data.toLowerCase() === variantType.toLowerCase()
                      ) === -1
                  ) {
                    setValue(`variantGroup.${i}.type`, [
                      ...getValues(`variantGroup.${i}.type`),
                      variantType,
                    ]);
                    setVariantType("");
                  }
                }}
                className="absolute w-full border border-slate-500 rounded-b-md bg-white shadow-md p-3 transition hover:bg-slate-100 hover:cursor-pointer"
              >
                <div className="flex items-center gap-x-3">
                  {watchVariantGroup
                    .at(i)
                    ?.type.findIndex(
                      (data) => data.toLowerCase() === variantType.toLowerCase()
                    ) === -1 ? (
                    <>
                      <IoAddCircleOutline size={20} />
                      <p>Add &quot;{variantType}&quot;</p>
                    </>
                  ) : (
                    <>
                      <p>No options</p>
                    </>
                  )}
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

                        setValue(
                          "variantTable",
                          getValues("variantTable").filter((data) => {
                            if (i === 0) {
                              return data.variant1.value !== type;
                            }
                            return data.variant2?.value !== type;
                          })
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

interface IProductVariantProps {
  variant1type: string;
  variant2type?: string;
  watchVariantGroup: IVariantGroup[];
  watchVariantTable: IVariant[];
  setValue: UseFormSetValue<IAddProductForm>;
  getValues: UseFormGetValues<IAddProductForm>;
}

const ProductVariant = ({
  variant1type,
  variant2type,
  watchVariantGroup,
  setValue,
  getValues,
  watchVariantTable,
}: IProductVariantProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const id = (Math.random() + 1).toString(36).substring(5);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (variant2type !== undefined) {
      setValue("variantTable", [
        ...getValues("variantTable"),
        {
          variant1: {
            name: watchVariantGroup.at(0)?.name,
            value: variant1type,
          },
          variant2: {
            name: watchVariantGroup.at(1)?.name,
            value: variant2type,
          },
          price: "",
          imageId: id,
          stock: 0,
        } as IVariant,
      ]);
    } else {
      setValue("variantTable", [
        ...getValues("variantTable"),
        {
          variant1: {
            name: watchVariantGroup.at(0)?.name,
            value: variant1type,
          },
          price: "",
          imageId: id,
          stock: 0,
        } as IVariant,
      ]);
    }
  }, []);

  return (
    <tr>
      <td>
        <input
          ref={imageRef}
          type="file"
          onChange={async (e) => {
            if (e.target.files !== undefined) {
              try {
                const formData = new FormData();
                formData.append("image_id", id);
                formData.append("image", e.target.files![0]);
                const res = await toast.promise(
                  API.post("/sellers/products/upload", formData),
                  {
                    pending: "Loading",
                    error: "Error uploading photo",
                  },
                  {
                    autoClose: 1500,
                  }
                );

                console.log(res.data);
                setImage(e.target.files![0]);

                console.log("success");
              } catch (e) {}
            }
          }}
          name=""
          id=""
          hidden
        />
        <img
          src={image && URL.createObjectURL(image)}
          onClick={() => {
            imageRef.current?.click();
          }}
          className="w-16 h-16 bg-red-200"
        />
      </td>
      <td>{variant1type}</td>
      {variant2type && <td>{variant2type}</td>}
      <td>
        <input
          type="text"
          name="price"
          onChange={(e) => {
            watchVariantTable.find((data) => {
              if (variant2type !== undefined) {
                return (
                  data.variant1.value === variant1type &&
                  data.variant2?.value === variant2type
                );
              }
              return data.variant1.value === variant1type;
            })!.price = e.target.value;

            setValue("variantTable", [...watchVariantTable]);
          }}
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
          onChange={(e) => {
            watchVariantTable.find((data) => {
              if (variant2type !== undefined) {
                return (
                  data.variant1.value === variant1type &&
                  data.variant2?.value === variant2type
                );
              }
              return data.variant1.value === variant1type;
            })!.stock = parseInt(e.target.value);

            setValue("variantTable", [...watchVariantTable]);
          }}
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
};
