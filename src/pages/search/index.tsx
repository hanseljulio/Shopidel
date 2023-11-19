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
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { TiDeleteOutline } from "react-icons/ti";

const Search = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>();
  const [productsRes, setProductsRes] = useState<IAPIResponse<IProduct[]>>();
  const [districts, setDistricts] = useState<IDistrict[]>();
  const [searchCategories, setSearchCategories] = useState<number[]>();
  const [initialSearchProductRes, setInitialSearchProductRes] =
    useState<IAPIResponse<IProduct[]>>();
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const inputPriceMinRef = useRef<HTMLInputElement>(null);
  const inputPriceMaxRef = useRef<HTMLInputElement>(null);
  const searchParam = useSearchParams();
  const [districtPopup, setDistrictsPopup] = useState<boolean>(false);
  const [districtSearch, setDistrictsSearch] = useState<string>("");

  const getDistricts = async () => {
    try {
      const res = await API.get("/address/districts");

      const data = res.data as IAPIResponse<IDistrict[]>;
      setDistricts(data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching districts", {
          autoClose: 1500,
        });
      }
    }
  };

  const getProductsQuery = async () => {
    try {
      const res = await API.get("/products", {
        params: {
          ...router.query,
        },
      });

      const data = res.data as IAPIResponse<IProduct[]>;
      setProductsRes(data);
      setInitialSearchProductRes(data);
      setSearchCategories([
        ...new Set(data.data?.map((item) => item.category_id)),
      ]);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching data", {
          autoClose: 1500,
        });
      }
    }
  };

  const getFilteredProductsQuery = async () => {
    try {
      const res = await API.get("/products", {
        params: {
          ...router.query,
        },
      });

      const data = res.data as IAPIResponse<IProduct[]>;
      setProductsRes(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching data", {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getDistricts();
      getProductsQuery();
    }
  }, [router.isReady, searchParam.get("s")]);

  useEffect(() => {
    getFilteredProductsQuery();
    setMaxPrice(searchParam.get("maxPrice") ?? "");
    setMinPrice(searchParam.get("minPrice") ?? "");
  }, [searchParam]);

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal content={contentModal!} onClose={() => setIsModal(false)} />
      )}
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto flex px-5 lg:px-0">
          <div className="pr-10 text-sm w-[15%]  hidden md:inline">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <FaFilter />
                <p>Filter</p>
              </div>
              <div
                onClick={() => {
                  inputPriceMaxRef.current!.value = "";
                  inputPriceMinRef.current!.value = "";
                  router.push({
                    href: router.asPath,
                    query: {
                      s: searchParam.get("s"),
                      sortBy: "price",
                      sort: "desc",
                      page: 1,
                    },
                  });
                }}
                className="hover:cursor-pointer"
              >
                <p className="text-xs text-red-500">Clear</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 relative ">
                <p className="font-bold">Location</p>
                <div className="flex flex-col gap-y-2">
                  {districts?.slice(0, 5).map((item, i) => {
                    return (
                      <div key={i} className="flex gap-x-2 items-start">
                        <input
                          type="checkbox"
                          onChange={() => {
                            let districts = (
                              searchParam.get("district") ?? ""
                            ).split("#");

                            if (districts[0] === "") districts.pop();

                            if (districts.includes(item.name.toString())) {
                              districts = districts.filter(
                                (data) => data !== item.name.toString()
                              );
                            } else {
                              districts.push(item.name.toString());
                            }

                            return router.push({
                              href: router.asPath,
                              query: {
                                ...router.query,
                                district: districts.join("#"),
                              },
                            });
                          }}
                          value={item.name}
                          checked={
                            searchParam.get("district")?.includes(item.name)
                              ? true
                              : false
                          }
                          className="rounded"
                        />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
                  <p
                    className="self-end underline underline-offset-2 hover:cursor-pointer"
                    onClick={() => setDistrictsPopup(true)}
                  >
                    See more
                  </p>
                  {districtPopup && (
                    <div className="absolute border bottom-0 w-[700px] z-50 h-[100%] bg-white  overflow-clip  shadow-md rounded-md">
                      <div className="w-full h-[100%] flex flex-col">
                        <div className="p-5 flex justify-between">
                          <input
                            type="text"
                            name="district"
                            id="district"
                            onChange={(e) => setDistrictsSearch(e.target.value)}
                            value={districtSearch}
                            placeholder="Search your district..."
                            className="rounded-md text-sm py-1"
                          />
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => setDistrictsPopup(false)}
                          >
                            <TiDeleteOutline size={30} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5 px-5 pb-5 overflow-auto flex-1">
                          {districts
                            ?.filter((data) =>
                              data.name
                                .toLowerCase()
                                .includes(districtSearch.toLowerCase())
                            )
                            .map((item, i) => {
                              return (
                                <div
                                  key={i}
                                  className="flex gap-x-2 items-start"
                                >
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      let districts = (
                                        searchParam.get("district") ?? ""
                                      ).split("#");

                                      if (districts[0] === "") districts.pop();

                                      if (
                                        districts.includes(item.name.toString())
                                      ) {
                                        districts = districts.filter(
                                          (data) =>
                                            data !== item.name.toString()
                                        );
                                      } else {
                                        districts.push(item.name.toString());
                                      }

                                      return router.push({
                                        href: router.asPath,
                                        query: {
                                          ...router.query,
                                          district: districts.join("#"),
                                        },
                                      });
                                    }}
                                    value={item.name}
                                    checked={
                                      searchParam
                                        .get("district")
                                        ?.includes(item.name)
                                        ? true
                                        : false
                                    }
                                    className="rounded"
                                  />
                                  <p>{item.name}</p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
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
                        ref={inputPriceMinRef}
                        onBlur={(e) => {
                          router.push({
                            href: router.asPath,
                            query: {
                              ...router.query,
                              minPrice: e.target.value,
                            },
                          });
                        }}
                        onChange={(e) => {
                          return setMinPrice(e.target.value);
                        }}
                        value={minPrice}
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
                          router.push({
                            href: router.asPath,
                            query: {
                              ...router.query,
                              maxPrice: e.target.value,
                            },
                          });
                        }}
                        onChange={(e) => {
                          return setMaxPrice(e.target.value);
                        }}
                        type="text"
                        value={maxPrice}
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
                        <div
                          key={i}
                          className="flex items-center gap-x-2  w-fit"
                        >
                          <div
                            className="flex hover:cursor-pointer"
                            onClick={(_) => {
                              router.push({
                                href: router.asPath,
                                query: {
                                  ...router.query,
                                  minRating: i + 1,
                                },
                              });
                            }}
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
                                      <AiFillStar size={15} color={"orange"} />
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
                  {searchCategories?.map((id, i) => {
                    return (
                      <div key={i} className="flex gap-x-2 items-start">
                        <input
                          onChange={(e) => {
                            let categoryId = (
                              searchParam.get("categoryId") ?? ""
                            ).split("#");

                            if (categoryId[0] === "") categoryId.pop();

                            if (categoryId.includes(id.toString())) {
                              categoryId = categoryId.filter(
                                (data) => data !== id.toString()
                              );
                            } else {
                              categoryId.push(id.toString());
                            }

                            return router.push({
                              href: router.asPath,
                              query: {
                                ...router.query,
                                categoryId: categoryId.join("#"),
                              },
                            });
                          }}
                          type="checkbox"
                          name=""
                          id=""
                          value={id}
                          checked={
                            searchParam
                              .get("categoryId")
                              ?.includes(id.toString())
                              ? true
                              : false
                          }
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
                <span className="font-bold">{searchParam.get("s")}</span>
                &quot;
              </p>
              <div className="gap-x-5 hidden md:flex">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm">Sort: </p>
                  <select
                    name="sortBy"
                    id="sortBy"
                    value={searchParam.get("sortBy") ?? "price"}
                    onChange={(e) => {
                      router.push({
                        href: router.asPath,
                        query: {
                          ...router.query,
                          sortBy: e.target.value,
                        },
                      });
                    }}
                    className="rounded-md border-slate-500 text-sm py-1"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="date">Newest</option>
                    <option value="most_buy">Most buy</option>
                    <option value="price">Price</option>
                  </select>
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="text-sm">Order: </p>
                  <select
                    value={searchParam.get("sort") ?? "desc"}
                    onChange={(e) => {
                      router.push({
                        href: router.asPath,
                        query: {
                          ...router.query,
                          sort: e.target.value,
                        },
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
                        filter={searchParam}
                        onApply={(data) => {
                          setIsModal(false);
                          return router.push({
                            href: router.asPath,
                            query: {
                              ...router.query,
                              ...data,
                            },
                          });
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
                        data={initialSearchProductRes!}
                        districts={districts!}
                        searchCategories={searchCategories!}
                        filter={searchParam}
                        onApply={(data) => {
                          setIsModal(false);
                          return router.push({
                            href: router.asPath,
                            query: {
                              ...data,
                            },
                          });
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
            {productsRes?.data?.length === 0 ? (
              <>
                <div className="flex flex-col items-center mt-10">
                  <div>
                    <img src="./images/not_found.png" alt="not_found" />
                  </div>
                  <h1 className="text-xl">Oops, Product not found</h1>
                  <p>Try another keyword</p>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
                {productsRes?.data?.map((product, i) => {
                  return (
                    <ProductCard
                      onClick={() =>
                        router.push(
                          `/${product.shop_name_slug}/${product.product_name_slug}`
                        )
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface SortModalProps {
  filter: ReadonlyURLSearchParams;
  onApply: (data: IProductFilter) => void;
}

const SortModal = ({ filter, onApply }: SortModalProps) => {
  const { register, handleSubmit } = useForm<IProductFilter>({
    defaultValues: {
      sort: (filter.get("sort") as ProductSortType) ?? "desc",
      sortBy: (filter.get("sortBy") as ProductSortByType) ?? "price",
    },
  });

  const onSubmit: SubmitHandler<IProductFilter> = (data) => {
    return onApply({
      ...data,
    });
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
          <option value="date">Newest</option>
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
  searchCategories: number[];
  districts: IDistrict[];
}

const FilterModal = ({
  data,
  filter,
  districts,
  onApply,
  searchCategories,
}: FilterModalProps) => {
  const [searchDistrict, setSearchDistrict] = useState<string>();
  const { register, setValue, watch, handleSubmit, getValues } =
    useForm<IProductFilter>({
      defaultValues: {
        s: filter.get("s") ?? "",
        categoryId: filter.get("categoryId") ?? "",
        district: filter.get("district") ?? "",
        maxPrice: filter.get("maxPrice") ?? "",
        minPrice: filter.get("minPrice") ?? "",
        minRating: filter.get("minRating") ?? "",
      },
    });

  const watchDistricts = watch("district");
  const watchCategories = watch("categoryId");
  const onSubmit: SubmitHandler<IProductFilter> = (data) => {
    return onApply({
      ...data,
      sort: (filter.get("sort") as ProductSortType) ?? "desc",
      sortBy: (filter.get("sortBy") as ProductSortByType) ?? "price",
    });
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
              setValue("categoryId", "");
              setValue("district", "");
              setValue("minRating", "");
              setValue("maxPrice", "");
              setValue("minPrice", "");
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
              <input
                type="text"
                name="district"
                id="district"
                placeholder="Search your district..."
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="rounded-md text-sm py-1"
              />
              <div className="flex flex-wrap gap-2">
                {watchDistricts !== "" &&
                  watchDistricts.split("#").map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="bg-slate-200 w-fit rounded-md p-2"
                        onClick={() => {
                          setValue(
                            "district",
                            watchDistricts
                              .split("#")
                              .filter((data) => data !== item)
                              .join("#")
                          );
                        }}
                      >
                        <p className="text-xs">{item}</p>
                      </div>
                    );
                  })}
              </div>
              {searchDistrict &&
                districts
                  ?.filter((data) =>
                    data.name
                      .toLowerCase()
                      .includes(searchDistrict.toLowerCase())
                  )
                  .map((item, i) => {
                    return (
                      <div key={i} className="flex gap-x-2 items-center">
                        <input
                          type="checkbox"
                          name={`districts.${i}`}
                          id={`districts.${i}`}
                          checked={
                            watchDistricts.includes(item.name) ? true : false
                          }
                          onChange={() => {
                            let districts = (watchDistricts ?? "").split("#");

                            if (districts[0] === "") districts.pop();

                            if (districts.includes(item.name)) {
                              districts = districts.filter(
                                (data) =>
                                  data.toLowerCase() !== item.name.toLowerCase()
                              );
                            } else {
                              districts.push(item.name);
                            }

                            setValue("district", districts.join("#"));
                          }}
                          className="rounded"
                        />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
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
                    {...register("minPrice")}
                    type="text"
                    name="minPrice"
                    id="minPrice"
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
                    {...register("maxPrice")}
                    type="text"
                    name="maxPrice"
                    id="maxPrice"
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
              {searchCategories?.map((id, i) => {
                return (
                  <div key={i} className="flex gap-x-2 items-start">
                    <input
                      onChange={() => {
                        let categoryId = watchCategories.split("#");

                        if (categoryId[0] === "") categoryId.pop();

                        if (categoryId.includes(id.toString())) {
                          categoryId = categoryId.filter(
                            (data) => data !== id.toString()
                          );
                        } else {
                          categoryId.push(id.toString());
                        }

                        setValue("categoryId", categoryId.join("#"));
                      }}
                      type="checkbox"
                      name=""
                      id=""
                      value={id}
                      checked={
                        watchCategories.includes(id.toString()) ? true : false
                      }
                      className="rounded"
                    />
                    <p>
                      {
                        data?.data?.find((raw) => raw.category_id === id)
                          ?.category_name
                      }
                    </p>
                  </div>
                );
              })}
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
