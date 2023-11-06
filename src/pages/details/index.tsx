import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { IAPIProductDetail, IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { currencyConverter } from "@/utils/utils";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";
import { toast } from "react-toastify";

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
  const [selectionVariant, setSelectionVariant] = useState("");
  const [selection, setSelection] = useState("");
  const [count, setCount] = useState<number>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [variation, setVariation] = useState(
    "https://down-id.img.susercontent.com/file/826639af5f9af89adae9a1700f073242"
  );

  console.log(product.variant_options[1]);

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

  let stock = 10;

  const inc = () => {
    if (count >= 0 && count <= stock - 1) {
      setCount(count + 1);
    }
  };

  const dec = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleToCart: SubmitHandler<IAPIProductDetail> = async (data, id) => {
    try {
      const res = await toast.promise(
        API.post(`/products/${id}`, data),
        {
          pending: "Loading",
          success: "Register success",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return `${(data.response?.data as IAPIResponse).message}`;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModal && (
        <div className="z-50 fixed">
          <Modal
            content={
              <Image width={800} height={800} src={variation} alt="..." />
            }
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
                <Image
                  width={200}
                  height={200}
                  src={variation}
                  alt=""
                  className="bigImage w-full cursor-pointer"
                  onClick={handleZoomImage}
                />
              ) : (
                <Image
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
                    <Image
                      key={product.images}
                      className="cursor-pointer w-[200px] h-full r"
                      width={100}
                      height={100}
                      src={product.images}
                      alt="..."
                      onMouseOver={() => handleMouseOver(product.images)}
                      onMouseOut={handleMouseOut}
                      onClick={handleZoomImage}
                    />
                  );
                })}
              </div>
            </div>
            <div className="order-2 md:order-3 purchaseBox border shadow-inner rounded-sm p-5 h-fit md:w-1/4 md:sticky md:top-0">
              <p className="productTitle text-lg font-medium pb-3">
                {product.name}
              </p>
              <div className="historyProduct flex align-middle text-xs pb-3">
                <span className="pr-3">{`Sold ${product.sold}`} </span>
                <span className="px-3 border-l border-slate-600 flex-row  md:flex flex gap-1 items-center">
                  <BsStarFill style={{ color: "#f57b29" }} />5
                </span>
              </div>
              <p className="productPrice text-xl font-semibold text-[#f57b29] py-3">
                {currencyConverter(parseInt(product.variants[0].price))}
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
                      <p
                        onChange={(e: any) => {
                          setSelectionVariant(e.target.value),
                            e.preventDefault();
                        }}
                      >
                        {item.variant_option_name}
                      </p>
                      <div className="flex gap-x-2">
                        {item.childs.map((variant, k) => {
                          return (
                            <button
                              key={k}
                              className="px-2 py-1 border rounded-md cursor-pointer hover:text-[#364968] hover:border-[#364968]"
                              value={variant}
                              onChange={(e: any) => {
                                setSelection(e.target.value),
                                  e.preventDefault();
                              }}
                            >
                              {variant}
                            </button>
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
                  <p>stock</p>
                </div>
              </div>
              <div className="btn flex gap-5 mt-10">
                <button
                  type="submit"
                  // onClick={() => handleToCart(product.id)}
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
              {/* <div className="spesification">
                <p className="text-lg font-medium border-b my-4">
                  Product Specifications
                </p>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td className="brand text-stone-600">{"Brand"}</td>
                      <td className="pl-10">lorem</td>
                    </tr>
                    <tr>
                      <td className="brand text-stone-600">{"Stock"}</td>
                      <td className="pl-10">ipsum</td>
                    </tr>
                    <tr>
                      <td className="brand text-stone-600">{"Shipped from"}</td>
                      <td className="pl-10">Malang</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              <div className="desc pt-5 ">
                <p className="text-lg font-medium border-b my-4">Description</p>
                <p className="">{product.description}</p>
              </div>
            </div>
          </div>
          <div className="seller flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1 w-full md:w-3/4">
              <div className="sellerShop bg-[#364968]  flex flex-row gap-y-5 text-white py-3 my-10 gap-10 px-5 ">
                <Image
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
                      <Image
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
                      <Image
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
                      <Image
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
                      <Image
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
                      <Image
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
                      <Image
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
                      <Image
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
              <p>Other products from this store</p>
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
