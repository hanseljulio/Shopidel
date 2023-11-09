import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { currencyConverter } from "@/utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import Button from "@/components/Button";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IWishlist {
  id: number;
  product_id: number;
  name: string;
  district: string;
  total_sold: number;
  price: string;
  picture_url: string;
  created_at: string | Date;
}

function Index() {
  const [wishlist, setWishlist] = useState<IAPIResponse<IWishlist[]>>();
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // For tracking selected product IDs
  const [isSelecting, setIsSelecting] = useState(false); // To enter selection mode

  const toggleSelection = (productId: number) => {
    if (selectedIds.includes(productId)) {
      setSelectedIds(selectedIds.filter((id) => id !== productId));
    } else {
      setSelectedIds([...selectedIds, productId]);
    }
  };

  const deleteSelected = () => {
    const updatedWishlist = wishlist?.data?.filter(
      (product) => !selectedIds.includes(product.id)
    );
    setWishlist({ ...wishlist, data: updatedWishlist });
    setSelectedIds([]);
    setIsSelecting(false);
  };

  const getWishlist = async () => {
    try {
      const res = await API.get("/products/favorites", {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      console.log("betul");
      const data = res.data as IAPIResponse<IWishlist[]>;
      setWishlist(data);

      if (data.pagination?.total_page! <= 5) {
        return setPaginationNumber(
          Array.from(Array(data.pagination?.total_page).keys())
        );
      }

      if (paginationNumber.length === 0) {
        return setPaginationNumber(Array.from(Array(5).keys()));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching couriers", {
          toastId: "errorCourier",
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0">
        <div>
          <p className="text-xl md:text-3xl font-bold mt-10">Wishlist</p>
        </div>
        <div className="flex justify-end mt-10">
          <input
            type="text"
            placeholder="Search in wishlist"
            className="rounded-md w-full md:w-80"
          />
          {isSelecting ? (
            <div>
              <Button
                text="Delete"
                onClick={deleteSelected}
                styling="px-2 py-1 bg-red-500 text-white mx-2"
              />
              <Button
                text="Cancel"
                onClick={() => {
                  setIsSelecting(false);
                  setSelectedIds([]);
                }}
                styling="px-2 py-1 bg-gray-500 text-white"
              />
            </div>
          ) : (
            <Button
              text="Select"
              onClick={() => setIsSelecting(true)}
              styling="px-2 py-1 bg-blue-500 text-white mx-2"
            />
          )}
        </div>
        <div className="gap-x-4 gap-y-1 grid grid-cols-2 md:grid-cols-6 mt-10">
          {wishlist?.data?.map((product) => (
            <div key={product.id}>
              <ProductCard
                image={product.picture_url}
                price={product.price}
                showStar={false}
                order={product.total_sold}
                title={product.name}
                selected={selectedIds.includes(product.id)}
                onSelect={() => toggleSelection(product.id)}
              />
            </div>
          ))}
        </div>
        <div className="text-center my-10 justify-center flex">
          <div className="flex self-end mt-2">
            {wishlist?.pagination?.current_page !== 1 && (
              <button
                onClick={() => {
                  if (
                    wishlist?.pagination?.current_page ===
                    paginationNumber[0] + 1
                  ) {
                    setPaginationNumber(
                      Array.from(paginationNumber, (x) => x - 1)
                    );
                  }
                  setPage(wishlist?.pagination?.current_page! - 1);
                }}
                className="px-2 py-1 border text-sm rounded-bl-md rounded-tl-md"
              >
                Prev
              </button>
            )}
            {paginationNumber.map((i) => {
              return (
                <Button
                  key={i}
                  text={(i + 1).toString()}
                  styling={`px-3 py-1 border ${
                    wishlist?.pagination?.current_page === i + 1 &&
                    "bg-slate-200 "
                  }`}
                  onClick={() => setPage(i + 1)}
                />
              );
            })}
            {wishlist?.pagination?.current_page !==
              wishlist?.pagination?.total_page && (
              <button
                onClick={() => {
                  if (
                    paginationNumber[paginationNumber.length - 1] <
                    wishlist?.pagination?.current_page!
                  ) {
                    paginationNumber.shift();
                    paginationNumber.push(
                      paginationNumber[paginationNumber.length - 1] + 1
                    );
                    setPaginationNumber(paginationNumber);
                  }
                  setPage(wishlist?.pagination?.current_page! + 1);
                }}
                className="px-2 py-1 border text-sm rounded-br-md rounded-tr-md"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
