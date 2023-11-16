import Dropdown from "@/components/Dropdown";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IProduct } from "@/interfaces/product_interface";
import { API } from "@/network";
import { checkAuthSSR, currencyConverter } from "@/utils/utils";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaListUl, FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

interface IBestSelling {
  name: string;
  price: string;
  picture_url: string;
  stars: string;
  total_sold: string;
  category: string;
}

export interface IEtalase {
  showcase_id: number;
  showcase_name: string;
}

export interface IAPIProfileShopResponse {
  seller_id: number;
  seller_name: string;
  seller_picture_url: string;
  seller_district: string;
  seller_operating_hour: {
    start: string;
    end: string;
  };
  seller_products: [
    {
      name: string;
      price: string;
      picture_url: string;
      stars: string;
      total_sold: number;
      created_at: string;
      category_level_1: string;
      category_level_2: string;
      category_level_3: string;
    },
    {
      name: string;
      price: string;
      picture_url: string;
      stars: string;
      total_sold: number;
      created_at: string;
      category_level_1: string;
      category_level_2: string;
      category_level_3: string;
    }
  ];
}
interface IProfileShopProps {
  seller: IAPIProfileShopResponse;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const shop = params?.shop;
  // let data: IAPIProductDetailResponse | undefined;
  console.log(shop, "par");

  try {
    const response = await API.get(`/sellers/${shop}/profile`);
    console.log("res", response.data);
    const seller = (response.data as IAPIResponse<IAPIProfileShopResponse>)
      .data;
    console.log("seller", seller);

    // const product = response.data;

    return {
      props: {
        seller,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    console.log(error);

    return {
      notFound: true,
    };
  }
};

function Index({ seller }: IProfileShopProps) {
  const router = useRouter();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [bestSelling, setBestSelling] = useState<IBestSelling[]>([]);
  const [categoryList, setCategoryList] = useState<IEtalase[]>([]);
  const [productCategory, setProductCategory] = useState<IProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    categoryList.length > 0 ? categoryList[0].showcase_id : null
  );

  console.log("sel", seller);

  const getBestSelling = async () => {
    console.log(seller);

    try {
      const res = await API.get(`/sellers/${seller.seller_name}/best-selling`);
      console.log("test");
      console.log(res);
      const data = res.data as IAPIResponse<IBestSelling[]>;
      console.log("test");
      console.log(data);
      setBestSelling(data.data!);
    } catch (e) {
      // console.log(e.message);
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getEtalase = async () => {
    try {
      const res = await API.get(`/sellers/${seller.seller_name}/showcases`);
      const data = res.data as IAPIResponse<IEtalase[]>;

      if (data.data) {
        setCategoryList(data.data);
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
      let showcaseId;

      if (id !== null) {
        res = await API.get(
          `/sellers/${seller.seller_name}/showcases/${id}/products`
        );
        showcaseId = id;
      } else {
        showcaseId =
          categoryList.length > 0 ? categoryList[0].showcase_id : null;
        res = await API.get(
          `/sellers/${seller.seller_name}/categories/${showcaseId}/products`
        );
      }

      const data = res.data as IAPIResponse<IProduct[]>;

      if (data.data) {
        setProductCategory(data.data);
        setActiveCategory(showcaseId);
        console.log(data, "");
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
    console.log(averageStars, "averageStars");
    return averageStars;
  };

  const averageStars = calculateAverageStars(seller?.seller_products || []);

  const showBestSelling = showAllProducts
    ? bestSelling
    : bestSelling.slice(0, 6);

  useEffect(() => {
    getBestSelling();
    getEtalase();
    getProductBasedOnCategory(null);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div className="sellerShop border border-[#364968] rounded-xl text-black flex flex-col items-center md:items-start md:flex-row :gap-y-5 py-5 my-10 gap-10 px-5 ">
          <img
            src={seller?.seller_picture_url}
            alt={seller?.seller_name}
            className="imgSeller w-full md:w-36 h-full object-fill "
          />
          <div className="flex flex-col md:flex-row gap-y-4 gap-x-48 w-full">
            <div className="aboutSeller  md:w-full flex flex-col gap-y-2 md:gap-y-3">
              <p className="text-xl md:text-3xl font-semibold">
                {seller?.seller_name}
              </p>
              <p className="text-sm md:text-base flex items-center text-neutral-600">
                <FaLocationDot /> <span>{seller?.seller_district}</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-end items-start md:gap-x-48 gap-y-2  md:w-full md:items-center ">
              <div className="text-center md:justify-center">
                <p className="flex text-left md:text-center md:items-center font-semibold gap-x-1">
                  <FaStar style={{ color: "#f57b29" }} />
                  {averageStars.toFixed(1)}
                </p>
                <p className=" text-neutral-600 text-sm">Rating</p>
              </div>
              {/* <div className="text-left md:text-center md:items-center md:justify-center">
                {seller.seller_products && (
                  <p className="font-semibold">
                    {seller.seller_products.length}
                  </p>
                )}

                <p className=" text-neutral-600 text-sm"> Products</p>
              </div> */}
              <div className="w-fit md:text-center text-left md:items-center md:justify-center">
                <p className="font-semibold">{`${seller?.seller_operating_hour.start} - ${seller?.seller_operating_hour.end} WIB`}</p>
                <p className=" text-neutral-600 text-sm">Operating hours</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="w-full font-semibold text-lg md:text-xl justify-center text-center my-3 py-2 ">
            Best Selling
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {showBestSelling &&
              showBestSelling.map(
                (e, k) =>
                  k < 12 && (
                    <ProductCard
                      onClick={() =>
                        router.push(`/${seller.seller_name}/${e.name}`)
                      }
                      key={k}
                      image={e.picture_url}
                      price={e.price}
                      showStar={true}
                      title={e.name}
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
        <div className="flex flex-col md:flex-row mt-10 w-full gap-x-5">
          <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-5  mt-5 pt-0 md:pt-6">
            <div>
              <p className="flex items-center gap-1 font-semibold border-b border-b-slate-200 pb-0 md:pb-8">
                <FaListUl className="hidden md:flex" size={15} />
                Etalase
              </p>
            </div>
            <div>
              <ul className="gap-y-5 flex md:flex-col gap-x-3">
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
          <div className="w-full md:w-3/4 gap-y-5 mt-5">
            <div className="w-full justify-start align-middle items-center flex bg-slate-200 py-3">
              <Dropdown
                label="Sort"
                labelStyle="w-0 m-0 p-0"
                width="w-[250px]"
                //   value={}
                flexLabel="flex md:items-center md:gap-[77px] pl-2 md:flex-row flex-col gap-2 items-start"
                options={[
                  "the most recent one",
                  "the most expensive",
                  "the cheapest",
                ]}
                //   onChange={}
              />
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:mt-3">
              {productCategory.map((e, k) => (
                <ProductCard
                  onClick={() => router.push(`/${encodeURIComponent(e.name)}`)}
                  key={k}
                  image={e.picture_url}
                  price={e.price}
                  showStar={false}
                  title={e.name}
                  order={`${e.total_sold} sold`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
