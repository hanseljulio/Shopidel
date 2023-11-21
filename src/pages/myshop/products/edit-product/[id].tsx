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
import { Reorder, useDragControls } from "framer-motion";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { ISellerEditProduct } from "@/interfaces/seller_interface";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { checkAuthSSR } from "@/utils/utils";

interface IAddProductForm {
  product_name: string;
  category: ICategory;
  description: string;
  is_new: boolean;
  is_active: boolean;
  video_url: string;
  hazardous_material: boolean;
  internal_sku: string;
  weight: string;
  size: string;
  price?: string;
  stock?: number;
  images: IProductImage[];
  variantGroup: IVariantGroup[];
  variantTable?: IVariant[];
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

interface IProductImage {
  id: string;
  file: File;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  let auth = await checkAuthSSR(context);

  if (auth === null) {
    context.res.writeHead(301, { location: "/login" });
    context.res.end();
  }

  try {
    console.log(id);
    const res = await API.get(`/sellers/products/${id}`, {
      headers: {
        Authorization: `Bearer ${auth?.access_token}`,
      },
    });
    console.log(res.data.data);
    return {
      props: {
        product: res.data.data,
      },
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e);
    }
  }
};

const SellerEditProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState<IAddProductForm>();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IAddProductForm>({
    defaultValues: {
      ...product,
    },
  });
  const router = useRouter();

  const watchCategory = watch("category");
  const watchVariantGroup = watch("variantGroup");
  const watchVariantTable = watch("variantTable");

  const [categories, setCategories] = useState<ICategory[]>();
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category2, setCategory2] = useState<ICategory[]>([]);
  const [category3, setCategory3] = useState<ICategory[]>([]);
  const [video, setVideo] = useState<string>("");
  const [images, setImages] = useState<Partial<IProductImage>[]>([
    {
      id: (Math.random() + 1).toString(36).substring(5),
    },
  ]);

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

  const onSubmit: SubmitHandler<IAddProductForm> = async (data) => {
    if (data.images.findIndex((img) => img.file === undefined) !== -1) {
      return setError("images", { message: "Photo is required" });
    }

    const formData = new FormData();
    try {
      formData.append("product_name", data.product_name);
      formData.append("description", data.description.replace(/\n/g, "\\n"));
      formData.append("hazardous_material", String(data.hazardous_material));
      formData.append("is_new", String(data.is_new));
      formData.append("is_active", String(data.is_active));
      formData.append("internal_sku", data.internal_sku);
      formData.append("weight", data.weight);
      formData.append("category_id", String(data.category.id));
      formData.append("size", data.size);
      data.images.forEach((img) => {
        formData.append("images[]", img.file);
      });
      if (!data.variantTable) {
        formData.append(
          "variants[]",
          JSON.stringify({
            variant1: {
              name: "",
              value: "",
            },
            stock: Number(data.stock),
            price: data.price,
            imageId: "",
          })
        );
      } else {
        data.variantTable.forEach((variant) => {
          formData.append("variants[]", JSON.stringify(variant));
        });
      }
      if (data.video_url !== "") {
        formData.append("video_url", data.video_url);
      }

      await toast.promise(
        API.post("/sellers/products", formData),
        {
          pending: "Loading",
          success: "Success",
          error: "Error add product",
        },
        { autoClose: 1500 }
      );

      router.back();
    } catch (e) {
      console.log(data);
      if (axios.isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    setValue("images", images as IProductImage[]);
  }, [images]);

  return (
    <>
      <ToastContainer />
      <SellerAdminLayout currentPage="Products">
        <div className="p-5">
          <div className="flex items-center md:flex-row justify-between  md:gap-0 flex-col gap-6">
            <h1 className="text-[30px]">Edit Product</h1>
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
                  className="w-full h-52 rounded-md"
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
                <div>
                  <h1 className="text-xl">Category</h1>
                  <p className="text-xs">Select your product category</p>
                </div>
                <div className="relative w-full mt-1">
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
                <div>
                  <h1 className="text-xl">Condition</h1>
                  <p className="text-xs">Product condition</p>
                </div>
                <div className="mt-1">
                  <select
                    {...register("is_new")}
                    name="is_new"
                    id="is_new"
                    className="rounded-md w-52"
                  >
                    <option value="true">New</option>
                    <option value="false">Used</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <h1 className="text-xl">Product Hazardous</h1>
                  <p className="text-xs">Product condition</p>
                </div>
                <div className="mt-1">
                  <select
                    {...register("hazardous_material")}
                    name="hazardous_material"
                    id="hazardous_material"
                    className="rounded-md w-52"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-xl">Photo</h1>
                    <p className="text-xs">Add your product photo</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-5">
                  <div className="w-fit mt-2">
                    <Reorder.Group
                      className="flex gap-x-5"
                      values={images}
                      onReorder={setImages}
                      axis="x"
                    >
                      {images.map((item) => {
                        return (
                          <ProductImage
                            key={JSON.stringify(item)}
                            images={images}
                            id={item.id!}
                            item={item}
                            onSet={(data) => {
                              clearErrors("images");
                              images.find((img) => img.id === item.id)!.file =
                                data;
                              return setImages([...images]);
                            }}
                            onDelete={() => {
                              let data = images.filter(
                                (img) => img.id !== item.id
                              );
                              clearErrors("images");
                              return setImages(data);
                            }}
                          />
                        );
                      })}
                    </Reorder.Group>
                  </div>
                  {images.length < 5 && (
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        images.push({
                          id: (Math.random() + 1).toString(36).substring(5),
                        });
                        setImages([...images]);
                      }}
                    >
                      <AiFillPlusCircle size={30} />
                    </div>
                  )}
                </div>
                {errors.images && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.images.message}
                  </p>
                )}
              </div>
              <div>
                <div>
                  <h1 className="text-xl">Video</h1>
                  <p className="text-xs">
                    Add your product video from YouTube embed url (optional)
                  </p>
                  <p className="text-xs">YouTube video should be unlisted</p>
                </div>
                <div className="mt-1">
                  <input
                    {...register("video_url")}
                    onBlur={(e) => {
                      setVideo(e.target.value);
                    }}
                    name="video_url"
                    id="video_url"
                    type="text"
                    className="rounded-md w-full"
                  />
                </div>
                {video && (
                  <div className="mt-2">
                    <h1>Preview</h1>
                    <iframe
                      width="560"
                      height="315"
                      src={video}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
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
                  {watchVariantGroup?.length < 2 && (
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
                      styling="bg-[#364968] rounded-md w-fit p-2 h-fit self-end text-white text-sm "
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
                {watchVariantGroup?.length !== 0 && (
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
                            {getValues("variantGroup")?.map((v, i) => {
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
                            ?.at(0)
                            ?.type.map((v0, i) => {
                              if (getValues("variantGroup").length === 1) {
                                return (
                                  <ProductVariant
                                    watchVariantTable={watchVariantTable!}
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
                                      watchVariantTable={watchVariantTable!}
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
              </div>
              {watchVariantGroup?.length === 0 && (
                <>
                  <div>
                    <div>
                      <h1 className="text-xl">Product Price</h1>
                      <p className="text-xs">Your product price</p>
                    </div>
                    <div className="mt-1">
                      <input
                        {...register("price", {
                          required: "Product price is required",
                        })}
                        type="text"
                        name="price"
                        id="price"
                        className="w-full rounded-md"
                      />
                    </div>
                    {errors.price && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div>
                      <h1 className="text-xl">Product Stock</h1>
                      <p className="text-xs">Your product stock</p>
                    </div>
                    <div className="mt-1">
                      <input
                        {...register("stock", {
                          required: "Product stock is required",
                        })}
                        type="text"
                        name="stock"
                        id="stock"
                        className="w-full rounded-md"
                      />
                    </div>
                    {errors.stock && (
                      <p role="alert" className="text-xs text-red-500 mt-1">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div>
                <div>
                  <h1 className="text-xl">SKU (Stock Keeping Unit)</h1>
                  <p className="text-xs">
                    Internal code that seller usually use to codify their
                    product
                  </p>
                </div>
                <div className="mt-1">
                  <input
                    {...register("internal_sku", {
                      required: "SKU is required",
                    })}
                    name="internal_sku"
                    id="internal_sku"
                    type="text"
                    className="rounded-md w-full"
                  />
                </div>
                {errors.internal_sku && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.internal_sku.message}
                  </p>
                )}
              </div>
              <div>
                <div>
                  <h1 className="text-xl">Weight</h1>
                  <p className="text-xs">Product weight in gram (g)</p>
                </div>
                <div className="mt-1">
                  <input
                    {...register("weight", {
                      required: "Weight is required",
                    })}
                    name="weight"
                    id="weight"
                    type="text"
                    className="rounded-md w-full"
                  />
                </div>
                {errors.weight && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div>
                <div>
                  <h1 className="text-xl">Size</h1>
                  <p className="text-xs">Product size in centimeter (cm)</p>
                </div>
                <div className="mt-1">
                  <input
                    {...register("size", {
                      required: "Size is required",
                    })}
                    name="size"
                    id="size"
                    type="text"
                    className="rounded-md w-full"
                  />
                </div>
                {errors.size && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.size.message}
                  </p>
                )}
              </div>
              <div>
                <div>
                  <h1 className="text-xl">Active</h1>
                  <p className="text-xs">
                    Do you want to list this product to public
                  </p>
                </div>
                <div className="mt-1">
                  <select
                    {...register("is_active")}
                    name="is_active"
                    id="is_active"
                    className="rounded-md w-52"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="mt-16 text-end">
                <Button
                  text="Add Product"
                  styling="bg-[#364968] p-2 text-white rounded-md text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerEditProductPage;

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
                          getValues("variantTable")?.filter((data) => {
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

interface IProductImageProps {
  images: Partial<IProductImage>[];
  item: Partial<IProductImage>;
  id: string;

  onSet: (data: File) => void;
  onDelete: () => void;
}
const ProductImage = ({
  item,
  onSet,
  onDelete,
  images,
}: IProductImageProps) => {
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();
  return (
    <Reorder.Item
      className="w-32 h-32 bg-red-200 relative flex items-center justify-center group hover:cursor-pointer"
      value={item}
      dragControls={controls}
      dragListener={isDrag}
      onDragEnd={() => {
        imageRef.current!.disabled = false;
      }}
      onDrag={() => {
        imageRef.current!.disabled = true;
      }}
      onClick={() => {
        if (isHover !== true) {
          imageRef.current?.click();
        }
      }}
    >
      <input
        type="file"
        hidden
        ref={imageRef}
        onChange={(e) => {
          if (e.target.files !== null && e.target.files.length !== 0) {
            onSet(e.target.files[0]);
            setIsDrag(true);
          }
        }}
      />
      {item.file ? (
        <img
          src={item.file && URL.createObjectURL(item.file)}
          className="h-full w-full absolute z-20 object-contain hover:cursor-pointer "
          draggable={false}
        />
      ) : (
        <div>
          <p className="text-xs">+ Add photo</p>
        </div>
      )}

      {images.length !== 1 && (
        <div
          onPointerDown={(e) => controls.start(e)}
          className="absolute z-20 transition opacity-0 group-hover:opacity-100  bg-slate-500/50  w-full h-full flex items-end justify-end"
        >
          <div
            onMouseEnter={() => (imageRef.current!.disabled = true)}
            onMouseLeave={() => (imageRef.current!.disabled = false)}
            onClick={() => {
              setIsHover(true);
              onDelete();
            }}
            className="p-2 bg-slate-200/50 rounded-md"
          >
            <AiFillDelete />
          </div>
        </div>
      )}
    </Reorder.Item>
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
  const [image, setImage] = useState<File>();
  const [variant, setVariant] = useState<IVariant>();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const id = (Math.random() + 1).toString(36).substring(5);
    if (variant2type !== undefined) {
      setValue("variantTable", [
        ...getValues("variantTable")!,
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
        ...getValues("variantTable")!,
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
    setId(id);
  }, []);

  return (
    <tr>
      <td>
        <input
          ref={imageRef}
          type="file"
          onChange={async (e) => {
            if (e.target.files !== null && e.target.files.length !== 0) {
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

                setImage(e.target.files![0]);
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
