import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  IAPIProductDetailResponse,
  IAPIResponse,
} from "@/interfaces/api_interface";
import { API } from "@/network";
import { clientUnauthorizeHandler } from "@/utils/utils";
import axios from "axios";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import Pagination from "@/components/Pagination";
import { FaTrash } from "react-icons/fa";
import { getCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { IWishlist } from "@/interfaces/product_interface";

function Index() {
  const { updateUser } = useUserStore();
  const router = useRouter();
  const [wishlist, setWishlist] = useState<IAPIResponse<IWishlist[]>>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(
    router.query.s !== undefined ? router.query.s.toString() : ""
  );

  const wishlistIsEmpty = () => {
    return !wishlist || !wishlist.data || wishlist.data.length === 0;
  };
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const [debouncedValue, setDebouncedValue] = useState(value);
  const delay = 500;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const searchQueryHandler = async () => {
    try {
      await getWishlist();
      router.push({
        pathname: "/wishlist",
        query: {
          ...(debouncedValue.trim() !== "" ? { s: debouncedValue } : {}),
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
      const res = await API.get(`/products/favorites?${page}`, {
        params: {
          s: query,
          page: page,
        },
      });
      console.log(res);
      const data = res.data as IAPIResponse<IWishlist[]>;
      setWishlist(data);
      console.log("dd", data.data);
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

  const handleDeleteWishlist = async (id: number) => {
    let favData: Pick<IAPIProductDetailResponse, "id"> = {
      id: id,
    };
    try {
      const response = await API.post(
        `/products/${id}/favorites/add-favorite`,
        favData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Remove from wishlist", { autoClose: 1500 });
        getWishlist();
      } else {
        toast.error("Failed remove from wishlist", { autoClose: 1500 });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to wishlist", {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0">
        <div className="flex gap-x-5 md:justify-between mt-10 mb-24 items-center">
          <p className="text-xl md:text-3xl font-bold items-center">Wishlist</p>

          <div className="flex justify-end  items-center gap-x-5">
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
        </div>
        {wishlistIsEmpty() ? (
          <div className="text-center my-3">
            <img
              alt="cart pic"
              src={"/images/emptycart.png"}
              className="w-80 h-80 object-cover py-3 mx-auto"
            />
            <p className="text-lg font-semibold text-center py-2 text-neutral-500">
              There is no favorite product
            </p>
            <Button
              text="Find your favorite product"
              styling="bg-[#364968] p-3 rounded-[8px] w-[300px] text-white my-4 hover:bg-[#587299]"
              onClick={() => router.push("/")}
            />
          </div>
        ) : (
          <>
            <div className="gap-x-4 gap-y-1 grid grid-cols-2 md:grid-cols-6 mt-10">
              {wishlist?.data?.map((product, i) => (
                <div
                  key={i}
                  className="rounded-md flex group group-hover:scale-95 "
                >
                  <div className="relative group-hover:group-hover:scale-10">
                    <ProductCard
                      image={product.picture_url}
                      price={product.price}
                      showStar={false}
                      order={product.total_sold}
                      title={product.name}
                      place={product.district}
                      onClick={() =>
                        router.push(
                          `/${product.shop_name_slug}/${product.product_name_slug}`
                        )
                      }
                    />
                  </div>
                  <div className="absolute group-hover:scale-95 text-red-600 p-2 hover:shadow-none cursor-pointer rounded-md transition-all duration-500 ease-in-out">
                    <FaTrash
                      size={20}
                      onClick={() => handleDeleteWishlist(product.product_id)}
                    />
                  </div>
                </div>
              ))}
              <div className="empty-card-div flex items-center justify-center mt-[30px]"></div>
            </div>
            <div className="text-center my-10 justify-center flex">
              <Pagination
                data={wishlist?.pagination}
                onNavigate={(navPage: any) => setPage(navPage)}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Index;
