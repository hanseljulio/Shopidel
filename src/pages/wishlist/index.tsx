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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProductDetail {
  images: string;
  varian?: {
    type?: string;
    color?: string;
  };
}
interface IProductDetailProps {
  product: IProductDetail;
}
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
const imgDummy: IProductDetail[] = [
  {
    images:
      "https://down-id.img.susercontent.com/file/826639af5f9af89adae9a1700f073242",
    varian: {
      type: "color",
      color: "red",
    },
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/65fe327802a4e2386cd19d6001e363ee",
    varian: {
      type: "color",
      color: "purple",
    },
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/e4e359076303b2a2688506898fdb8793",
    varian: {
      type: "color",
      color: "yellow",
    },
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/ff0a9d6bbc26dfaa93fb20a8e3f85a29",
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/826639af5f9af89adae9a1700f073242",
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/3926ab1d88624e7e9feb42c76a830d93",
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/5676ea16c2a424a8285e806bb8b42616",
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/50044a0096334c145d8560b7a085170c",
  },
  {
    images:
      "https://down-id.img.susercontent.com/file/bc3b634e8b2beb1f09f59671102800a7",
  },
];

function Index() {
  const [wishlist, setWishlist] = useState<IAPIResponse<IWishlist[]>>();
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
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
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 ">
        <div>
          <p className=" text-xl md:text-3xl font-bold mt-10">Wishlist</p>
        </div>
        <div className="flex justify-end mt-10">
          <input
            type="text"
            placeholder="Search in wishlist"
            className="rounded-md w-full md:w-80"
          />
        </div>
        <div className="gap-x-4 gap-y-1 grid grid-cols-2 md:grid-cols-6 mt-10">
          {wishlist?.data?.map((e, k) => (
            <ProductCard
              key={k}
              image={e.picture_url}
              price={e.price}
              showStar={false}
              order={e.total_sold}
              title={e.name}
            />
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
                className="px-2 py-1 border text-sm rounded-bl-md rounded-tl-md "
              >
                Prev
              </button>
            )}
            {paginationNumber.map((i, _) => {
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
                className="px-2 py-1 border text-sm rounded-br-md rounded-tr-md "
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
