import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CarouselHome from "@/components/Carousel";
import { IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { useEffect, useState } from "react";
import Category from "@/components/Category";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { IListCategory, IProduct } from "@/interfaces/product_interface";

export default function Home() {
  const router = useRouter();
  const [productList, setProductList] = useState<IAPIResponse<IProduct[]>>({});
  const [listCategory, setListCategory] = useState<
    IAPIResponse<IListCategory[]>
  >({});

  const getProduct = async () => {
    try {
      const res = await API.get(
        `/products?page=1&sortBy=price&sort=asc&limit=18`
      );

      const data = res.data as IAPIResponse<IProduct[]>;

      setProductList(data!);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getCategories = async () => {
    try {
      const res = await API.get(`/products/top-categories`);

      const data = res.data as IAPIResponse<IListCategory[]>;

      setListCategory(data!);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <CarouselHome />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div>
          <p className="text-lg md:text-xl mt-10 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Category
          </p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-9 gap-x-4 gap-y-4">
          {listCategory.data?.map((e, i) => (
            <>
              <Category
                src={e.picture_url}
                text={e.name}
                alt={e.name}
                onClick={() =>
                  router.push({
                    pathname: "/search",
                    query: {
                      categoryId: e.category_id,
                    },
                  })
                }
              />
            </>
          ))}
        </div>
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
          {productList.data?.map((product) => (
            <>
              <ProductCard
                key={product.id}
                onClick={() =>
                  router.push(
                    `/${product.shop_name_slug}/${product.product_name_slug}`
                  )
                }
                image={product.picture_url}
                price={product.price}
                showStar={true}
                star={product.rating}
                title={product.name}
                place={product.district}
                order={product.total_sold}
              />
            </>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
