import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IProductPagination } from "@/interfaces/product_interface";
import {
  IAPIProfileShopResponse,
  IBestSelling,
  IEtalaseSeller,
  IProfileShopProps,
} from "@/interfaces/seller_interface";
import { API } from "@/network";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const shop = params?.shop;

  try {
    const response = await API.get(`/sellers/${shop}/profile`);
    const seller = (response.data as IAPIResponse<IAPIProfileShopResponse>)
      .data;

    return {
      props: {
        seller,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);

    return {
      notFound: true,
    };
  }
};

function Index({ seller }: IProfileShopProps) {
  const router = useRouter();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [bestSelling, setBestSelling] = useState<IBestSelling[]>([]);
  const [categoryList, setCategoryList] = useState<IEtalaseSeller[]>([]);
  const [productCategory, setProductCategory] = useState<IProductPagination>();
  const [showPage, setShowPage] = useState<IAPIResponse<IEtalaseSeller[]>>();
  const [page, setPage] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    categoryList.length > 0 ? categoryList[0].showcase_id : null
  );

  const getBestSelling = async () => {
    try {
      const res = await API.get(
        `/sellers/${seller.shop_name_slug}/best-selling`
      );
      const data = res.data as IAPIResponse<IBestSelling[]>;

      setBestSelling(data.data!);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getEtalase = async () => {
    try {
      const res = await API.get(`/sellers/${seller.shop_name_slug}/showcases`);
      const data = res.data as IAPIResponse<IEtalaseSeller[]>;
      if (data.data) {
        setCategoryList(data.data);
        setShowPage(data);
      } else {
        console.error("Data is undefined or null");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching review products", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  const getProductBasedOnCategory = async (id: number | null) => {
    try {
      let res;

      if (id !== null) {
        res = await API.get(
          `/sellers/${seller.shop_name_slug}/showcases/${id}/products?page=${page}`
        );
      } else {
        res = await API.get(
          `/sellers/${seller.shop_name_slug}/showcases/0/products?page=${page}`
        );
      }

      const data = res.data;
      if (data.data) {
        setProductCategory(data);

        setActiveCategory(id);
      } else {
        console.error("Data is undefined or null");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error("Error fetching products", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  const calculateAverageStars = (products: { stars: string }[]) => {
    const validProducts = products.filter(
      (product) => !isNaN(parseFloat(product.stars.replace(",", ".")))
    );

    if (validProducts.length === 0) {
      return 0;
    }

    const totalStars = validProducts.reduce(
      (accStars, product) =>
        accStars + parseFloat(product.stars.replace(",", ".")),
      0
    );

    const averageStars = totalStars / validProducts.length;
    return averageStars;
  };

  const averageStars = calculateAverageStars(seller?.seller_products || []);

  const showBestSelling = showAllProducts
    ? bestSelling
    : bestSelling.slice(0, 6);

  useEffect(() => {
    getBestSelling();
  }, []);
  useEffect(() => {
    getEtalase();
  }, [activeCategory]);
  useEffect(() => {
    getProductBasedOnCategory(activeCategory);
  }, [activeCategory, page]);

  return (
    <div>
      <Navbar />
      <Head>
        <title>{seller.seller_name} Shop at Shopidel</title>
        <meta
          name="description"
          content={`Browse the latest products from ${seller.seller_name}`}
        />
      </Head>
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div className="sellerShop border h-auto border-slate-200 rounded-t-xl text-black flex flex-col md:flex-row items-center md:items-start gap-y-5 mt-10 gap-10 overflow-hidden">
          <div className="md:w-2/3 w-full bg-slate-100 flex-col flex gap-y-10 h-full p-3 ">
            <div className="flex flex-col w-full md:flex-row gap-x-5 items-center text-center md:text-left gap-y-3 ">
              <img
                src={seller?.seller_picture_url}
                alt={seller?.seller_name}
                className="imgSeller w-full md:w-28 h-full object-fill rounded-lg items-center"
                placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                onError={(e) => {
                  (e.target as HTMLInputElement).src =
                    "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                }}
              />
              <div className="aboutSeller flex md:w-full text-center md:text-left justify-between ">
                <div className="w-full">
                  <p className="text-xl md:text-2xl font-semibold">
                    {seller?.seller_name}
                  </p>
                  <p className="text-sm md:text-base flex gap-x-1 text-center justify-center md:justify-start md:text-left items-center  text-neutral-600">
                    <FaLocationDot size={13} />
                    <span>{seller?.seller_district}</span>
                  </p>
                </div>

                <div className="w-full text-center md:text-center md:items-center md:justify-center">
                  <p className="font-medium">{`${seller?.seller_operating_hour.start} - ${seller?.seller_operating_hour.end} WIB`}</p>
                  <p className=" text-neutral-600 text-sm">Operating hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <div className="p-3">
              <p className="gap-x-1 flex text-lg text-[#f57b29] items-center font-semibold mb-1">
                {seller.seller_name}
              </p>
              <p>
                {seller.seller_description
                  ?.split("\\n")
                  .map((paragraph: string, index: number) => (
                    <span key={index} className="line-break">
                      {paragraph}
                      <br />
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="w-full font-semibold text-lg md:text-xl justify-center text-center mt-10 py-5 ">
            Best Selling
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {showBestSelling &&
              showBestSelling.map(
                (e, k) =>
                  k < 12 && (
                    <ProductCard
                      onClick={() =>
                        router.push(
                          `/${seller.shop_name_slug}/${e.product_name_slug}`
                        )
                      }
                      key={k}
                      image={e.picture_url}
                      price={e.price}
                      showStar={true}
                      title={e.name}
                      order={e.total_sold}
                      star={parseInt(e.stars)}
                    />
                  )
              )}
            {!showAllProducts && (
              <div className="lg:max-w-7xl w-full absolute align-middle justify-end items-center text-right hidden md:flex mt-40">
                <button
                  className="p-3 from-transparent to-white block transform group-hover:animate-shine bg-slate-900 text-white  rounded-full absolute justify-center align-middle items-end shadow-xl shadow-slate-600 hover:bg-slate-500 opacity-50"
                  onClick={() => setShowAllProducts(true)}
                >
                  <span className="text-xs">View More </span> &gt;
                </button>
              </div>
            )}
            {!showAllProducts && (
              <button
                className="p-3 bg-slate-900 col-span-2 text-white flex rounded-md shadow-md shadow-slate-600 hover-bg-slate-500 opacity-70 md:hidden justify-center items-center"
                onClick={() => setShowAllProducts(true)}
              >
                View More
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-20 w-full gap-x-5">
          <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-5  mt-5 pt-0 md:pt-6 h-full ">
            <div className="items-start">
              <p className="flex items-center gap-1 font-semibold border-b border-b-slate-2 00 pb-0 md:pb-8">
                <FaListUl className="hidden md:flex" size={15} />
                Etalase
              </p>
            </div>
            <div className="w-full h-full ">
              <ul className="etalase gap-y-5 grid grid-cols-4 md:grid-cols-1 w-full text-xs md:text-base justify-between">
                <li
                  className={`cursor-pointer ${
                    !activeCategory ? "text-[#e09664]" : ""
                  }`}
                  onClick={() => getProductBasedOnCategory(null)}
                >
                  All
                </li>
                {categoryList.map((e, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer ${
                      activeCategory === e.showcase_id ? "text-[#e09664]" : ""
                    }`}
                    onClick={() => getProductBasedOnCategory(e.showcase_id)}
                  >
                    {e.showcase_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-3/4 gap-y-5 mt-10">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:mt-3">
              {productCategory?.data.map((e, k) => (
                <>
                  <ProductCard
                    onClick={() =>
                      router.push(
                        `/${seller.shop_name_slug}/${e.product_name_slug}`
                      )
                    }
                    key={k}
                    image={e.picture_url}
                    price={e.price}
                    showStar={false}
                    title={e.name}
                    order={e.total_sold}
                  />
                </>
              ))}
              <div className="col-span-2 md:col-span-4 text-center mt-5">
                <Pagination
                  data={productCategory?.pagination}
                  onNavigate={(navPage: any) => setPage(navPage)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
