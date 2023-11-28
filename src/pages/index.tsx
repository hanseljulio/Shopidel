import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CarouselHome from "@/components/Carousel";
import { IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { useEffect } from "react";
import Category from "@/components/Category";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IListCategory, IProduct } from "@/interfaces/product_interface";
import { useUserStore } from "@/store/userStore";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie } from "cookies-next";
import Head from "next/head";
import { InferGetServerSidePropsType } from "next";
import Button from "@/components/Button";

export default function Home({
  recommendedProducts,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { updateUser } = useUserStore();

  useEffect(() => {
    if (router.query.force_logout === "true") {
      updateUser(undefined);
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      toast.error("An error occured, you've been logged out", {
        autoClose: 1500,
      });
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <ToastContainer />
      <Head>
        <title>Shopidel</title>
        <meta name="description" content="Welcome to Shopidel!" />
        <link rel="icon" href="/vm2/favicon.ico" sizes="any" />
      </Head>
      <Navbar />
      <CarouselHome />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div>
          <p className="text-lg md:text-xl mt-10 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Category
          </p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-9 gap-x-4 gap-y-4">
          {categories?.map((category, i) => (
            <Category
              key={i}
              src={category.picture_url}
              text={category.name}
              alt={category.name}
              onClick={() =>
                router.push({
                  pathname: "/search",
                  query: {
                    categoryId: category.category_id,
                  },
                })
              }
            />
          ))}
        </div>
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-6 w-full">
          {recommendedProducts?.map((product) => (
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
          ))}
        </div>
        <Button
          text="View More"
          onClick={() => router.push("/search")}
          styling="flex justify-center items-center text-center text-white mx-auto bg-[#f57b29] my-5 py-2 px-5 hover:bg-[#fddf97] rounded-md"
        />
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const prop = {
    recommendedProducts: [] as IProduct[],
    categories: [] as IListCategory[],
  };
  const getProduct = async () => {
    try {
      const res = await API.get(
        `/products?page=1&sortBy=price&sort=asc&limit=18`
      );

      const data = (res.data as IAPIResponse<IProduct[]>).data;
      prop.recommendedProducts = data!;
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

      const data = (res.data as IAPIResponse<IListCategory[]>).data;
      prop.categories = data!;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  await getProduct();
  await getCategories();

  return {
    props: {
      recommendedProducts: prop.recommendedProducts,
      categories: prop.categories,
    },
  };
};
