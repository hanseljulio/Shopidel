import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { clientUnauthorizeHandler } from "@/utils/utils";
import axios from "axios";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Pagination from "@/components/Pagination";

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
  const { updateUser } = useUserStore();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<IAPIResponse<IWishlist[]>>();
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(
    router.query.s !== undefined ? router.query.s.toString() : ""
  );

  const searchQueryHandler = async () => {
    try {
      await getWishlist();
      router.push({
        pathname: "/wishlist",
        query: {
          ...(query.trim() !== "" ? { s: query } : {}),
          page: 1,
        },
      });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === "") {
      searchQueryHandler();
    }
  };

  const getWishlist = async () => {
    try {
      const res = await API.get(`/products/favorites`, {
        params: {
          s: query,
          page: page,
        },
      });
      console.log(res);
      const data = res.data as IAPIResponse<IWishlist[]>;
      setWishlist(data);
      console.log(data.data);

      if (data.pagination?.total_page! <= 5) {
        return setPaginationNumber(
          Array.from(Array(data.pagination?.total_page).keys())
        );
      }

      if (paginationNumber.length === 0) {
        return setPaginationNumber(Array.from(Array(5).keys()));
      }
      console.log("betul");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error("Error fetching wishlist", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
      console.log("salah");
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
        <div className="flex justify-end mt-10 items-center gap-x-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchQueryHandler();
            }}
          >
            <input
              type="text"
              placeholder="Search in wishlist"
              className="rounded-md w-full md:w-80"
              onChange={handleQueryChange}
              value={query}
              onBlur={searchQueryHandler}
            />
          </form>
        </div>
        <div className="gap-x-4 gap-y-1 grid grid-cols-2 md:grid-cols-6 mt-10">
          {wishlist?.data?.map((product, i) => {
            if (wishlist.data?.length !== 0) {
              return (
                <div
                  key={i}
                  className="hover:border hover:border-[#364968] rounded-md"
                >
                  <ProductCard
                    image={product.picture_url}
                    price={product.price}
                    showStar={false}
                    order={product.total_sold}
                    title={product.name}
                    place={product.district}
                  />
                </div>
              );
            } else {
              <img src="/vm2/images/emptycart.png" alt="" />;
            }
          })}
        </div>
        <div className="text-center my-10 justify-center flex">
          <Pagination
            data={wishlist?.pagination}
            onNavigate={(navPage: any) => setPage(navPage)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
