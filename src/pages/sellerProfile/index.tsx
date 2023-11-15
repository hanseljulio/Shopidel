import Dropdown from "@/components/Dropdown";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IAPIResponse } from "@/interfaces/api_interface";
import { IProduct } from "@/interfaces/product_interface";
import { API } from "@/network";
import { checkAuthSSR, currencyConverter } from "@/utils/utils";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { FaListUl, FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

interface IProductDetail {
  images: string;
  varian?: {
    type?: string;
    color?: string;
  };
}

interface IBestSelling {
  name: string;
  price: string;
  picture_url: string;
  stars: string;
  total_sold: string;
  category: string;
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

interface ICategoryProduct {
  category_id: number;
  category_name: string;
}

interface IAPIProfileShopResponse {
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
  shop: IAPIProfileShopResponse;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIProfileShopResponse | undefined = undefined;

  let accessToken = context.req.cookies["accessToken"];

  try {
    const res = await API.get(`/sellers/${`Jejak Trendi`}/profile`); //masih hardcode
    data = (res.data as IAPIResponse<IAPIProfileShopResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
      console.log("errorrrrr");
    }
  }

  return {
    props: {
      shop: data || null,
    },
  };
};

function Index({ shop }: IProfileShopProps) {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [bestSelling, setBestSelling] = useState<IBestSelling[]>([]);
  const [categoryList, setCategoryList] = useState<ICategoryProduct[]>([]);
  const [productCategory, setProductCategory] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const getBestSelling = async () => {
    try {
      const res = await API.get(`sellers/${shop.seller_name}/best-selling`); //seller_name masih harcode
      const data = res.data as IAPIResponse<IBestSelling[]>;

      if (data.data) {
        setBestSelling(data.data);
      } else {
        console.error("Data is undefined or null");
      }
      console.log("best");
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
      const res = await API.get(
        `/sellers/${shop.seller_name}/categories
          `
      );
      const data = res.data as IAPIResponse<ICategoryProduct[]>;
      if (data.data) {
        setCategoryList(data.data);
      } else {
        console.error("Data is undefined or null");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error("Error fetching review products", {
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
          `/sellers/${shop.seller_name}/categories/${id}/products`
        );
      } else {
        // Fetch all products when no category is selected
        res = await API.get(`/sellers/${shop.seller_name}/best-selling
        `);
      }

      const data = res.data as IAPIResponse<IProduct[]>;

      if (data.data) {
        setProductCategory(data.data);
        setSelectedCategory(id);
      } else {
        console.error("Data is undefined or null");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error("Error fetching products", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getBestSelling();
    getCategories();
  }, []);

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

  const averageStars = calculateAverageStars(shop?.seller_products || []);

  const showBestSelling = showAllProducts
    ? bestSelling
    : bestSelling.slice(0, 6);
  return (
    <div>
      <Navbar />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div className="sellerShop border border-[#364968] rounded-xl text-black flex flex-row gap-y-5 py-3 my-10 gap-10 px-5 ">
          <img
            width={90}
            height={0}
            src={shop?.seller_picture_url}
            alt={shop?.seller_name}
            className="imgSeller w-20 h-ful "
          />
          <div className="flex flex-col md:flex-row gap-y-4 gap-x-48 w-full">
            <div className="aboutSeller  md:w-full flex flex-col gap-y-2">
              <p className="text-lg md:text-xl font-semibold">
                {shop?.seller_name}
              </p>
              <p className="text-sm flex items-center text-neutral-600">
                <FaLocationDot /> <span>{shop?.seller_district}</span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-start items-start md:justify-between md:w-full md:items-center ">
              <div className="text-center md:justify-center">
                <p className="flex text-left md:text-center md:items-center font-semibold gap-x-1">
                  <FaStar style={{ color: "#f57b29" }} />
                  {averageStars.toFixed(1)}
                </p>
                <p className=" text-neutral-600 text-sm">Rating</p>
              </div>
              <div className="text-left md:text-center md:items-center md:justify-center">
                <p className="font-semibold">30</p>
                <p className=" text-neutral-600 text-sm"> Products</p>
              </div>
              <div className="w-fit md:text-center text-left md:items-center md:justify-center">
                <p className="font-semibold">{`${shop?.seller_operating_hour.start} - ${shop?.seller_operating_hour.end} WIB`}</p>
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
            {showBestSelling.map(
              (e, k) =>
                k < 12 && (
                  <ProductCard
                    key={k}
                    image={e.picture_url}
                    price={e.price}
                    showStar={true}
                    title={e.name}
                    star={parseInt(e.stars)}
                    order={parseInt(e.total_sold)}
                  />
                )
            )}
            {!showAllProducts && (
              <div className="lg:max-w-7xl w-full absolute align-middle justify-end items-center text-right hidden md:flex mt-40">
                <button
                  className="p-3 bg-slate-900 text-white  rounded-full absolute justify-center align-middle items-end shadow-xl shadow-slate-600 hover:bg-slate-500 opacity-50"
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
                Category
              </p>
            </div>
            <div>
              <ul className="gap-y-5 flex md:flex-col gap-x-3">
                <li
                  className={`cursor-pointer ${
                    selectedCategory === null ? "text-[#e09664]" : ""
                  }`}
                  onClick={() => getProductBasedOnCategory(null)}
                >
                  All
                </li>
                {categoryList.map((e, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer ${
                      selectedCategory === e.category_id ? "text-[#e09664]" : ""
                    }`}
                    onClick={() => getProductBasedOnCategory(e.category_id)}
                  >
                    {e.category_name}
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
                  key={k}
                  image={e.picture_url}
                  price={e.price}
                  showStar={false}
                  title={e.name}
                  place={e.district}
                  order={e.total_sold}
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
