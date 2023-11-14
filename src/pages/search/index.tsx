import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import { AiFillStar, AiOutlineArrowUp, AiOutlineStar } from "react-icons/ai";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API } from "@/network";
import { IAPIResponse } from "@/interfaces/api_interface";
import "react-toastify/dist/ReactToastify.css";
import { IProduct } from "@/interfaces/product_interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { IDistrict } from "@/interfaces/courier_interface";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>();
  const [productsRes, setProductsRes] = useState<IAPIResponse<IProduct[]>>();
  const [districts, setDistricts] = useState<IDistrict[]>();
  const [searchCategories, setSearchCategories] = useState<number[]>();
  const [initialSearchProductRes, setInitialSearchProductRes] =
    useState<IAPIResponse<IProduct[]>>();
  const inputPriceMinRef = useRef<HTMLInputElement>(null);
  const inputPriceMaxRef = useRef<HTMLInputElement>(null);
  const searchParam = useSearchParams();

  const [filter, setFilter] = useState<IProductFilter>({
    districts: [],
    category: [],
    minRating: "",
    price: {
      min: "",
      max: "",
    },
    sortBy: "price",
    sort: "desc",
  });

  const query = router.query.q;

  const getDistricts = async () => {
    try {
      const res = await API.get("/address/districts");

      const data = res.data as IAPIResponse<IDistrict[]>;
      setDistricts(data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getProductsQuery = async () => {
    setFilter({
      ...filter,
      districts: [],
      category: [],
      minRating: "",
      price: {
        min: "",
        max: "",
      },
    });
    try {
      const res = await API.get("/products", {
        params: {
          s: query,
          sortBy: filter.sortBy,
          sort: filter.sort,
          limit: 30,
        },
      });

      const data = res.data as IAPIResponse<IProduct[]>;

      setProductsRes(data);
      setInitialSearchProductRes(data);
      setSearchCategories([
        ...new Set(data.data?.map((item) => item.category_id)),
      ]);
      console.log(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getProductFilter = async () => {
    try {
      const res = await API.get("/products", {
        params: {
          s: query,
          sortBy: filter.sortBy,
          sort: filter.sort,
          categoryId: filter.category.join("#"),
          minRating: filter.minRating,
          minPrice: filter.price.min,
          maxPrice: filter.price.max,
          limit: 30,
        },
      });

      const data = res.data as IAPIResponse<IProduct[]>;

      setProductsRes(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error getting data", {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    if (query !== undefined) {
      getDistricts();
      getProductsQuery();
    }
  }, [query]);

  useEffect(() => {
    getProductFilter();
  }, [filter]);

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal content={contentModal!} onClose={() => setIsModal(false)} />
      )}
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto  flex px-5 lg:px-0">
          {productsRes?.data?.length === 0 ? (
            <div className="h-screen flex justify-center w-screen">
              <div className="flex flex-col items-center mt-10">
                <div>
                  <img src="./images/not_found.png" alt="not_found" />
                </div>
                <h1 className="text-xl">Oops, Product not found</h1>
                <p>Try another keyword</p>
              </div>
            </div>
          ) : (
            <>
              <div className="pr-10 text-sm w-[15%] hidden md:inline">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2">
                    <FaFilter />
                    <p>Filter</p>
                  </div>
                  <div
                    onClick={() => {
                      setFilter({
                        ...filter,
                        districts: [],
                        category: [],
                        minRating: "",
                        price: {
                          min: "",
                          max: "",
                        },
                      });
                      inputPriceMaxRef.current!.value = "";
                      inputPriceMinRef.current!.value = "";
                    }}
                    className="hover:cursor-pointer"
                  >
                    <p className="text-xs text-red-500">Clear</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold">Location</p>
                    <div className="flex flex-col gap-y-2">
                      {/* {districts?.map((item, i) => {
                        console.log(districts);
                        return (
                          <div key={i} className="flex gap-x-2 items-start">
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked === false) {
                                  return setFilter({
                                    ...filter,
                                    districts: filter.districts.filter(
                                      (district) => district !== item.name
                                    ),
                                  });
                                }
                              }}
                              className="rounded"
                            />
                            <p>{item.name}</p>
                          </div>
                        );
                      })} */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold">Price</p>
                    <div className="flex flex-col gap-y-2">
                      <div>
                        <p>Minimum</p>
                        <div className="relative flex">
                          <div className="absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center">
                            <span>Rp</span>
                          </div>
                          <input
                            ref={inputPriceMinRef}
                            onBlur={(e) => {
                              setFilter({
                                ...filter,
                                price: {
                                  ...filter.price,
                                  min: e.target.value,
                                },
                              });
                            }}
                            type="text"
                            name=""
                            id=""
                            className="w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <p>Maximum</p>
                        <div className="relative flex">
                          <div className="absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center">
                            <span>Rp</span>
                          </div>
                          <input
                            ref={inputPriceMaxRef}
                            onBlur={(e) => {
                              setFilter({
                                ...filter,
                                price: {
                                  ...filter.price,
                                  max: e.target.value,
                                },
                              });
                            }}
                            type="text"
                            name=""
                            id=""
                            className="w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold">Rating</p>
                    <div className="flex flex-col gap-y-2">
                      {Array(5)
                        .fill("")
                        .map((_, i) => {
                          return (
                            <div key={i} className="flex items-center gap-x-2">
                              <div
                                className="flex hover:cursor-pointer"
                                onClick={() => {}}
                              >
                                {Array(5)
                                  .fill("")
                                  .map((_, k) => {
                                    return (
                                      <div
                                        key={k}
                                        className="flex gap-x-2 items-center"
                                      >
                                        {k <= i ? (
                                          <AiFillStar
                                            size={15}
                                            color={"orange"}
                                          />
                                        ) : (
                                          <AiOutlineStar
                                            size={15}
                                            color={"orange"}
                                          />
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                              <p>
                                {i + 1 !== 5 && <AiOutlineArrowUp size={10} />}
                              </p>
                            </div>
                          );
                        })
                        .reverse()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="font-bold">Category</p>
                    <div className="flex flex-col gap-y-2">
                      {searchCategories?.map((id, i) => {
                        return (
                          <div key={i} className="flex gap-x-2 items-start">
                            <input
                              onChange={(e) => {
                                router.push({
                                  href: router.asPath,
                                  query: {
                                    q: searchParam.get("q"),
                                    categoryId: 1,
                                  },
                                });
                              }}
                              type="checkbox"
                              name=""
                              id=""
                              value={id}
                              className="rounded"
                            />
                            <p>
                              {
                                initialSearchProductRes?.data?.find(
                                  (raw) => raw.category_id === id
                                )?.category_name
                              }
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center ">
                  <p>
                    Product search result for &quot;
                    <span className="font-bold">{router.query.q}</span>&quot;
                  </p>
                  <div className="gap-x-5 hidden md:flex">
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm">Sort: </p>
                      <select
                        name="sortBy"
                        id="sortBy"
                        value={filter.sortBy}
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            sortBy: e.target.value as ProductSortByType,
                          });
                        }}
                        className="rounded-md border-slate-500 text-sm py-1"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="newest">Newest</option>
                        <option value="most_buy">Most buy</option>
                        <option value="price">Price</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm">Order: </p>
                      <select
                        value={filter.sort}
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            sort: e.target.value as ProductSortType,
                          });
                        }}
                        name="sort"
                        id="sort"
                        className="rounded-md border-slate-500 text-sm py-1"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>
                  <div className="gap-x-5 flex md:hidden">
                    <div
                      onClick={() => {
                        setIsModal(true);
                        setContentModal(
                          <SortModal
                            filter={filter}
                            onApply={(data) => {
                              setFilter({
                                ...filter,
                                ...data,
                              });
                              return setIsModal(false);
                            }}
                          />
                        );
                      }}
                      className="hover:cursor-pointer"
                    >
                      <FaSort />
                    </div>
                    <div
                      onClick={() => {
                        setIsModal(true);
                        setContentModal(
                          <FilterModal
                            data={productsRes!}
                            filter={filter}
                            onApply={(data) => {
                              console.log(data);
                              setFilter({
                                ...data,
                              });
                              return setIsModal(false);
                            }}
                          />
                        );
                      }}
                      className="hover:cursor-pointer"
                    >
                      <FaFilter />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
                  {productsRes?.data?.map((product, i) => {
                    return (
                      <ProductCard
                        onClick={() =>
                          router.push(`/${product.shop_name}/${product.name}`)
                        }
                        key={i}
                        showStar={true}
                        image={product.picture_url}
                        price={product.price}
                        order={product.total_sold}
                        title={product.name}
                        place={product.district}
                        star={product.rating}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

interface SortModalProps {
  filter: IProductFilter;
  onApply: (data: IProductFilter) => void;
}

const SortModal = ({ filter, onApply }: SortModalProps) => {
  const { register, handleSubmit } = useForm<IProductFilter>({
    defaultValues: {
      sort: filter.sort,
      sortBy: filter.sortBy,
    },
  });

  const onSubmit: SubmitHandler<IProductFilter> = (data) => {
    return onApply(data);
  };

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <p className="text-sm">Sort</p>
        <select
          {...register("sortBy")}
          name="sortBy"
          id="sortBy"
          className="roole.log(data);unded-md border-slate-500 text-sm py-1"
        >
          <option value="recommended">Recommended</option>
          <option value="newest">Newest</option>
          <option value="most_buy">Most buy</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="flex flex-col">
        <p className="text-sm">Order</p>
        <select
          {...register("sort")}
          name="sort"
          id="sort"
          className="rounded-md border-slate-500 text-sm py-1"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <Button
        text="Apply"
        styling="w-full bg-[#29374e] p-2  rounded-md text-white"
      />
    </form>
  );
};

interface FilterModalProps extends SortModalProps {
  data: IAPIResponse<IProduct[]>;
}

const FilterModal = ({ data, filter, onApply }: FilterModalProps) => {
  const { register, setValue, watch, handleSubmit, getValues } =
    useForm<IProductFilter>({
      defaultValues: filter,
    });

  const watchDistricts = watch("districts");
  const watchCategories = watch("category");
  const onSubmit: SubmitHandler<IProductFilter> = (data) => {
    return onApply(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto text-sm h-[75vh] px-5">
        <div className="pt-5 flex justify-between items-center ">
          <div className="flex items-center gap-x-2">
            <FaFilter />
            <p>Filter</p>
          </div>
          <div
            onClick={() => {
              setValue("category", []);
              setValue("districts", []);
              setValue("minRating", "");
              setValue("price.max", "");
              setValue("price.min", "");
            }}
            className="hover:cursor-pointer"
          >
            <p className="text-xs text-red-500">Clear</p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Location</p>
            <div className="flex flex-col gap-y-2">
              {[...new Set(data?.data?.map((item) => item.district))].map(
                (item, i) => {
                  return (
                    <div key={i} className="flex gap-x-2 items-center">
                      <input
                        type="checkbox"
                        name={`districts.${i}`}
                        id={`districts.${i}`}
                        checked={watchDistricts.includes(item) ? true : false}
                        onChange={() => {
                          if (getValues("districts").includes(item)) {
                            return setValue(
                              "districts",
                              getValues("districts").filter(
                                (district) => district !== item
                              )
                            );
                          }
                          return setValue("districts", [
                            ...getValues("districts"),
                            item,
                          ]);
                        }}
                        className="rounded"
                      />
                      <p>{item}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Price</p>
            <div className="flex flex-col gap-y-2">
              <div>
                <p>Minimum</p>
                <div className="relative flex">
                  <div className="absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center">
                    <span>Rp</span>
                  </div>
                  <input
                    {...register("price.min")}
                    type="text"
                    name="price.min"
                    id="price.min"
                    className="w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10"
                  />
                </div>
              </div>
              <div>
                <p>Maximum</p>
                <div className="relative flex">
                  <div className="absolute bg-[#F3F4F5] h-full p-2 rounded-tl-md rounded-bl-md flex items-center">
                    <span>Rp</span>
                  </div>
                  <input
                    {...register("price.max")}
                    type="text"
                    name="price.max"
                    id="price.max"
                    className="w-full focus:border-none border border-[#F3F4F5] rounded-md text-sm pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Rating</p>
            <div className="flex flex-col gap-y-2">
              {Array(5)
                .fill("")
                .map((_, i) => {
                  return (
                    <div key={i} className="flex items-center gap-x-2">
                      <input
                        {...register("minRating")}
                        type="radio"
                        id={`minRating-${i + 1}`}
                        value={`${i + 1}`}
                        className="w-3 h-3"
                      />
                      <div className="flex hover:cursor-pointer">
                        {Array(5)
                          .fill("")
                          .map((_, k) => {
                            return (
                              <div
                                key={k}
                                className="flex gap-x-2 items-center"
                              >
                                {k <= i ? (
                                  <AiFillStar size={15} color={"orange"} />
                                ) : (
                                  <AiOutlineStar size={15} color={"orange"} />
                                )}
                              </div>
                            );
                          })}
                      </div>
                      <p>{i + 1 !== 5 && <AiOutlineArrowUp size={10} />}</p>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-bold">Category</p>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p>Handphone</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p>Casing</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p>Accessories</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p>Charger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        text="Apply"
        styling="w-full bg-[#29374e] p-2 mt-5 rounded-md text-white"
      />
    </form>
  );
};

export default Search;
