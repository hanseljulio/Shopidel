import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  IAPIResponse,
  IAPIUserProfileResponse,
} from "@/interfaces/api_interface";
import { API } from "@/network";
import { currencyConverter } from "@/utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";
import { toast } from "react-toastify";

interface IAPIProductDetail {
  id: number;
  name: string;
  description: string;
  stars: string;
  sold: number;
  available: number;
  images: null;
  variant_options: [
    {
      variant_option_name: string;
      childs: [];
    }
  ];
  variants: [
    {
      variant_id: number;
      variant_name: string;
      selections: [
        {
          selection_variant_name: string;
          selection_name: string;
        }
      ];
      stock: number;
      price: string;
    }
  ];
}

interface IAPIProductCart {
  product_id: string;
  quantity: string;
}

interface IProductDetail {
  images: string;
  varian?: {
    type?: string;
    color?: string;
  };
}
interface IProductDetailProps {
  product: IAPIProductDetail;
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIProductDetail | undefined;

  let accessToken = context.req.cookies["accessToken"];

  try {
    const res = await API.get("/products/2", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    data = (res.data as IAPIResponse<IAPIProductDetail>).data;
    console.log(data, "dataa");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
      console.log("errrorrrrr");
    }
  }

  return {
    props: {
      product: data,
    },
  };
};

const ProductDetail = ({ product }: IProductDetailProps) => {
  const router = useRouter();
  const [count, setCount] = useState<number>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [variation, setVariation] = useState(
    "https://down-id.img.susercontent.com/file/826639af5f9af89adae9a1700f073242"
  );
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [subtotal, setSubtotal] = useState<number>(0);
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      try {
        await API.delete(
          `/products/${product.id}/favorites/add-favorite
        `,
          {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
          }
        );
        console.log("delete");

        setIsFavorite(false);
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      try {
        await API.post(
          `/products/${product.id}/favorites/add-favorite
        `,
          null,
          {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
            },
          }
        );
        console.log("masuk");

        setIsFavorite(true);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  const calculateSubtotal = () => {
    const selectedVariant = product.variants.find((variant) => {
      return Object.keys(selectedVariants).every((optionName) => {
        return variant.selections.some((selection) => {
          return (
            selection.selection_variant_name === optionName &&
            selection.selection_name === selectedVariants[optionName]
          );
        });
      });
    });

    if (selectedVariant) {
      const price = parseInt(selectedVariant.price);
      setSubtotal(price * count);
      setCurrentStock(selectedVariant.stock);
    }
  };

  useEffect(() => {
    calculateSubtotal();
  }, [selectedVariants, count]);

  const handleClick = (variant: string, optionName: string) => {
    setSelectedVariants({
      ...selectedVariants,
      [optionName]: variant,
    });
  };

  const handleMouseOver = (src: string) => {
    setIsHovering(true);
    setVariation(src);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleZoomImage = () => {
    setIsModal(true);
  };

  const inc = () => {
    if (count >= 0 && count <= currentStock - 1) {
      setCount(count + 1);
    }
  };

  const dec = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleToCart = async () => {
    if (Object.keys(selectedVariants).length === 0 || count < 1) {
      return;
    }

    const variant = product.variants.find((v) => {
      const variantKey = v.selections[0].selection_variant_name;
      return selectedVariants[variantKey] === v.selections[0].selection_name;
    });

    if (!variant) {
      return;
    }

    const data = {
      product_id: variant.variant_id,
      quantity: count,
    };

    try {
      const response = await API.post(`/accounts/carts`, data, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Added to cart", { autoClose: 1500 });
      } else {
        toast.error("Failed to add to cart", { autoClose: 1500 });
      }
      console.log("yess");

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to cart", {
          autoClose: 1500,
        });
      }
      console.log("nooooo");
    }
  };

  const handleWishlist: SubmitHandler<IAPIProductDetail> = async (data) => {
    let favData: Pick<IAPIProductDetail, "id"> = {
      id: data.id,
    };

    try {
      const response = await API.post(
        `products/2/favorites/add-favorite`,
        favData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Added to cart", { autoClose: 1500 });
      } else {
        toast.error("Failed to add to cart", { autoClose: 1500 });
      }
      console.log("yess");

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to cart", {
          autoClose: 1500,
        });
      }
      console.log("nooooo");
    }
  };

  return (
    <>
      {isModal && (
        <div className="z-50 fixed">
          <Modal
            content={<img width={800} height={800} src={variation} alt="..." />}
            onClose={() => setIsModal(false)}
          />
        </div>
      )}
      <div>
        <Navbar />
        <div className="mx-auto lg:max-w-7xl px-4 md:px-0">
          <div className="flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1 md:order-1 imageProduct w-full md:w-1/4">
              {isHovering == true ? (
                <img
                  width={200}
                  height={200}
                  src={variation}
                  alt=""
                  className="bigImage w-full cursor-pointer"
                  onClick={handleZoomImage}
                />
              ) : (
                <img
                  width={100}
                  height={100}
                  src={variation}
                  alt=""
                  className="bigImage w-full cursor-pointer"
                  onClick={handleZoomImage}
                />
              )}
              <div className="variation flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {imgDummy.map((product) => {
                  return (
                    <img
                      key={product.images}
                      className="cursor-pointer w-[90px] h-full"
                      width={50}
                      height={50}
                      src={product.images}
                      alt="..."
                      onMouseOver={() => handleMouseOver(product.images)}
                      onMouseOut={handleMouseOut}
                      onClick={handleZoomImage}
                    />
                  );
                })}
              </div>
              <div className="favorite-icon mt-5 text-right">
                <button onClick={handleFavoriteClick}>
                  {isFavorite ? (
                    <div className="flex items-center gap-1">
                      <FaHeart style={{ color: "red" }} />
                      <p>Favorite</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FaRegHeart style={{ color: "red" }} />
                      <p>Favorite</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="order-2 md:order-3 purchaseBox border shadow-inner rounded-sm p-5 h-fit md:w-1/4 md:sticky md:top-0">
              <p className="productTitle text-md font-medium pb-3">
                Set Amounts
              </p>

              <div className="flex gap-3 md:gap-2 mb-2 text-sm text-neutral-600 py-3 justify-between">
                <p className="">Pengiriman</p>
                <div>
                  <div className="flex items-center gap-1">
                    <FaLocationDot /> {"Malang"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTruckFast /> {`Jakarta Selatan ${"Rp3000"}`}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 text-sm text-neutral-600">
                {product.variant_options.map((item, i) => {
                  return (
                    <div key={i} className="flex gap-x-5 items-center">
                      <p>{item.variant_option_name}</p>
                      <div className="flex gap-x-2">
                        {item.childs.map((variant, k) => {
                          const optionName = item.variant_option_name;
                          return (
                            <p
                              key={k}
                              className={`px-2 py-1 border rounded-md cursor-pointer ${
                                selectedVariants[optionName] === variant
                                  ? "bg-[#d6e4f8] border border-[#364968]"
                                  : ""
                              }`}
                              onClick={() => handleClick(variant, optionName)}
                            >
                              {variant}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex text-center items-center mt-5">
                <div className="quantity flex border border-zinc-600">
                  <button className="minus w-5" onClick={dec}>
                    -
                  </button>
                  <input
                    className="text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    min={1}
                    max={100}
                    type="number"
                    value={count}
                    onChange={(e: any) => {
                      setCount(parseInt(e.target.value)), e.preventDefault();
                    }}
                  />
                  <button className="plus w-5" onClick={inc}>
                    +
                  </button>
                </div>
                <div className="stock text-xs text-neutral-500 py-3 pl-5 ">
                  <p>{`Stock ${currentStock}`}</p>
                </div>
              </div>
              <div className="flex text-sm text-neutral-600 py-3 justify-between">
                <p className="">Subtotal</p>
                <p className="subTotal text-lg font-semibold text-neutral-800">
                  {currencyConverter(subtotal)}
                </p>
              </div>
              <div className="btn flex gap-5 mt-10">
                <button
                  type="submit"
                  onClick={handleToCart}
                  className="flex items-center justify-center gap-1 border border-[#364968] hover:shadow-md bg-[#d6e4f8] p-2 w-36 hover:bg-[#eff6fd]  transition-all duration-300"
                >
                  <AiOutlineShoppingCart /> <span>Add to cart</span>
                </button>
                <button
                  type="submit"
                  className=" bg-[#364968] text-white p-2 w-36 justify-center hover:bg-[#394e6f] hover:shadow-lg"
                >
                  Buy now
                </button>
              </div>
            </div>

            <div className="order-3 md:order-2 description mt-10 md:mt-0 md:w-2/4">
              <div className="spesification">
                <p className="productTitle text-2xl font-medium pb-3">
                  {product.name}
                </p>
                <div className="historyProduct flex items-center text-xs pb-3">
                  <p className="pr-3">{`Sold ${product.sold}`} </p>
                  <p className="px-3 border-l border-slate-600 flex-row  md:flex flex gap-1 items-center justify-center ">
                    <BsStarFill style={{ color: "#f57b29" }} />
                    <span className="items-center">5</span>
                  </p>
                </div>
                <p className="productPrice text-2xl font-semibold text-[#f57b29] py-3">
                  {currencyConverter(parseInt(product.variants[0].price))}
                </p>
              </div>
              <div className="desc pt-5 ">
                <p className="text-lg font-medium border-b my-4">Description</p>
                <p className="">{product.description}</p>
              </div>
            </div>
          </div>
          <div className="seller flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1  w-3/4">
              <div className="sellerShop bg-[#364968] flex flex-row gap-y-5 text-white py-3 my-10 gap-10 px-5 ">
                <img
                  width={90}
                  height={0}
                  src={"/images/defaultuser.png"}
                  alt="seller"
                  className="imgSeller w-20 h-full place-self-center"
                />
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-48">
                  <div className="aboutSeller justify-between w-full md:w-1/2 ">
                    <p>Nama Toko</p>
                    <p>
                      <button className="flex gap-1 md:gap-2 mt-3 text-sm justify-center items-center w-full border border-[#fddf97] hover:shadow-lg   p-1 md:w-36 text-[#fddf97] hover:bg-[#1c2637]  transition-all duration-300">
                        <FaStore /> <p>Visit the store</p>
                      </button>
                    </p>
                  </div>

                  <div className="aboutSeller justify-between w-1/2 md:w-full">
                    <p className="flex gap-5 md:gap-12">
                      Rating
                      <span className="flex items-center ">
                        <FaStar /> 4.8
                      </span>
                    </p>
                    <p className="flex gap-5 md:gap-14 mt-3">
                      Product <span>30</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="reviews">
                <div className="">
                  <p className="reviewsProduct text-lg font-semibold">
                    Product Reviews
                  </p>
                  <div>
                    <p>{"4.8 dari 5"}</p>
                    <div className="star flex">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                  <div className="buyerReviews flex mt-5  border-y">
                    <div className="imageCust pr-4 rounded-full overflow-hidden">
                      <img
                        width={100}
                        height={100}
                        src={"/images/auth_hero.png"}
                        alt=".."
                      />
                    </div>
                    <div className="bodyReview flex-row gap-y-5">
                      <p className="custName">{"cust name"}</p>
                      <p className="flex">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </p>
                      <p className="dateReview text-sm text-neutral-500 pb-3">
                        {"2023-06-05"}| {"Variasi: S"}
                      </p>
                      <p className="theReview">
                        {" terlalu mahal dengan kwalitas kain yg nerawang"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 w-full md:w-1/4 items-center flex flex-col  md:justify-end mt-5">
              <p className="py-3">Other products from this store</p>
              <div className="md:w-3/4 content-center flex flex-row gap-x-4 justify-between md:flex-col">
                <ProductCard
                  image="https://down-id.img.susercontent.com/file/bc3b634e8b2beb1f09f59671102800a7"
                  title="Sepatu Neki"
                  price={1000000}
                  showStar={false}
                />
                <ProductCard
                  image="https://down-id.img.susercontent.com/file/bc3b634e8b2beb1f09f59671102800a7"
                  title="Sepatu Neki"
                  price={1000000}
                  showStar={false}
                />
                <ProductCard
                  image="https://down-id.img.susercontent.com/file/bc3b634e8b2beb1f09f59671102800a7"
                  title="Sepatu Neki"
                  price={1000000}
                  showStar={false}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
