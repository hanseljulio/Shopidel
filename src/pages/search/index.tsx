import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
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

const Search = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>();
  const [productsRes, setProductsRes] = useState<IAPIResponse<IProduct[]>>();
  const [filter, setFilter] = useState<IProductFilter>({
    districts: [],
    category: [],
    rating: [],
    price: {
      min: "",
      max: "",
    },
    sortBy: "price",
    sort: "desc",
  });

  const query = router.query.q;

  const getProductsQuery = async () => {
    try {
      const res = await API.get("/products", {
        params: {
          s: query,
          sortBy: filter.sortBy,
          sort: filter.sort,
          limit: 30,
        },
      });
      setProductsRes(res.data as IAPIResponse<IProduct[]>);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    if (query !== undefined) {
      getProductsQuery();
    }
  }, [query, filter]);

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal content={contentModal!} onClose={() => setIsModal(false)} />
      )}
      <Navbar />
      <div className="py-8">
        <div className="max-w-7xl mx-auto flex px-5 lg:px-0">
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
                    rating: [],
                    price: {
                      min: "",
                      max: "",
                    },
                  });
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
                  {[
                    ...new Set(productsRes?.data?.map((item) => item.district)),
                  ].map((item, i) => {
                    return (
                      <div key={i} className="flex gap-x-2 items-center">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={(e) => {
                            if (filter?.districts?.includes(item)) {
                              return setFilter({
                                ...filter,
                                districts: filter.districts.filter(
                                  (district) => district !== item
                                ),
                              });
                            }
                            return setFilter({
                              ...filter,
                              districts: [...filter?.districts, item],
                            });
                          }}
                          className="rounded"
                        />
                        <p>{item}</p>
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
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            price: {
                              ...filter.price,
                              min: e.target.value,
                            },
                          });
                        }}
                        value={filter.price.min}
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
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            price: {
                              ...filter.price,
                              max: e.target.value,
                            },
                          });
                        }}
                        value={filter.price.max}
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
                        <div key={i} className="flex gap-x-2 items-center">
                          <input
                            onChange={(_) => {
                              if (filter.rating.includes(i + 1)) {
                                return setFilter({
                                  ...filter,
                                  rating: filter.rating.filter(
                                    (rating) => rating !== i + 1
                                  ),
                                });
                              }
                              return setFilter({
                                ...filter,
                                rating: [...filter.rating, i + 1],
                              });
                            }}
                            type="checkbox"
                            name=""
                            id=""
                            className="rounded"
                          />
                          <p className="flex items-center gap-x-1">
                            <span>
                              <AiFillStar color={"orange"} size={15} />
                            </span>
                            {i + 1 === 5 ? i + 1 : `${i + 1} Above`}
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
                          setFilter({
                            ...filter,
                            ...data,
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
              {productsRes?.data?.map((item, i) => {
                return (
                  <ProductCard
                    key={i}
                    showStar={true}
                    image={item.picture_url}
                    price={item.price}
                    order={item.total_sold}
                    title={item.name}
                    place={item.district}
                    star={5}
                  />
                );
              })}
            </div>
          </div>
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
          className="rounded-md border-slate-500 text-sm py-1"
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
  return (
    <>
      <div className="overflow-auto text-sm h-[75vh]">
        <div className="pt-5 flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <FaFilter />
            <p>Filter</p>
          </div>
          <div>
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
                        name=""
                        id=""
                        onChange={(e) => {}}
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
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p className="flex items-center gap-x-1">
                  <span>
                    <AiFillStar color={"orange"} size={15} />
                  </span>
                  4 above
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p className="flex items-center gap-x-1">
                  <span>
                    <AiFillStar color={"orange"} size={15} />
                  </span>
                  3 above
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p className="flex items-center gap-x-1">
                  <span>
                    <AiFillStar color={"orange"} size={15} />
                  </span>
                  2 above
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <input type="checkbox" name="" id="" className="rounded" />
                <p className="flex items-center gap-x-1">
                  <span>
                    <AiFillStar color={"orange"} size={15} />
                  </span>
                  1 above
                </p>
              </div>
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
    </>
  );
};

export default Search;
