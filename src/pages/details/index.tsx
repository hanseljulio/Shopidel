import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";

const ProductDetail = () => {
  const [count, setCount] = useState<number>(1);
  const [variationType, setVariationType] = useState<[]>([]);
  const [variation, setVariation] = useState<[]>([]);
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
  return (
    <div>
      <Navbar />
      <div className="mx-auto lg:max-w-7xl px-4 md:px-0">
        <div className="flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5">
          <div className="order-1 md:order-1 imageProduct w-full md:w-1/3">
            <div
              id="indicators-carousel"
              className="relative"
              data-carousel="static"
            >
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item="active"
                >
                  <Image
                    width={10}
                    height={10}
                    src="/images/auth_hero.png"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    width={10}
                    height={10}
                    src="/docs/images/carousel/carousel-2.svg"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    width={10}
                    height={10}
                    src="/docs/images/carousel/carousel-3.svg"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    width={10}
                    height={10}
                    src="/docs/images/carousel/carousel-4.svg"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <Image
                    width={10}
                    height={10}
                    src="/docs/images/carousel/carousel-5.svg"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
              </div>
              {/* <!-- Slider indicators --> */}
              <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="true"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 4"
                  data-carousel-slide-to="3"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 5"
                  data-carousel-slide-to="4"
                ></button>
              </div>
              {/* <!-- Slider controls --> */}
              <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
            {/* <Image
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="bigImage w-full"
            /> */}
            <div className="variation">
              <Image
                width={100}
                height={100}
                src="/images/auth_hero.png"
                alt=""
              />
            </div>
          </div>
          <div className="order-2 md:order-3 purchaseBox border shadow-inner rounded-sm p-5 h-fit md:w-1/3">
            <p className="productTitle text-lg font-medium pb-3">
              Lorem ipsum dolor sit amet
            </p>
            <div className="historyProduct flex align-middle text-xs pb-3">
              <span className="pr-3"> Sold 2000 </span>
              <span className="px-3 border-l border-slate-600 flex-row  md:flex flex gap-1 items-center">
                <BsStarFill style={{ color: "#f57b29" }} />5
              </span>
            </div>
            <p className="productPrice text-xl font-semibold text-[#f57b29] py-3">
              Rp.10.000
            </p>
            <div className="flex gap-5 md:gap-10 text-sm text-neutral-600 py-3 justify-between">
              <p className="">Pengiriman</p>
              <div>
                <div className="flex items-center gap-2">
                  <FaLocationDot /> {"Malang"}
                </div>
                <div className="flex items-center gap-2">
                  <FaTruckFast /> {`Jakarta Selatan ${"Rp3000"}`}
                </div>
              </div>
            </div>

            {variationType !== null ? (
              <div>
                {variationType.map((n) => (
                  <div key={n}>
                    <p>{"Variation Type (color/size)"}</p>
                    {variation.map((n) => (
                      <button key={n} type="submit">
                        {"varian"}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}

            <div className="flex text-center items-center">
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

          <div className="order-3 md:order-2 description mt-10 md:mt-0 md:w-1/3">
            <div className="spesification">
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
            </div>
            <div className="desc pt-5 ">
              <p className="text-lg font-medium border-b my-4">Description</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab
                pariatur suscipit, porro rerum vero ven. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Deleniti explicabo
                dignissimos veritatis sapiente quibusdam possimus labore unde?
                Fugit, vitae reprehenderit?
              </p>
            </div>
          </div>
        </div>
        <div className="sellerShop bg-[#364968] flex flex-row gap-y-5 text-white py-3 gap-10 px-5 ">
          <Image
            width={90}
            height={0}
            src={"/images/defaultuser.png"}
            alt="seller"
            className="imgSeller w-20 h-full"
          />
          <div className="aboutSeller flex flex-col md:flex-row justify-between w-1/2 md:w-full">
            <div className="order-1">
              <p>Nama Toko</p>
              <p>
                <button className="flex gap-2 items-center w-full border border-[#fddf97] hover:shadow-lg   p-1 md:w-36 text-[#fddf97] hover:bg-[#1c2637]  transition-all duration-300">
                  <FaStore /> <p>Visit the store</p>
                </button>
              </p>
            </div>
            <div className="order-2">
              <p className="flex justify-between md:gap-20">
                Rating
                <span className="flex items-center text-[#fddf97]">
                  <FaStar />
                  {"5"}
                </span>
              </p>
              <p className="flex justify-between md:gap-20">
                Product <span className="text-[#fddf97]">{"30"}</span>
              </p>
            </div>
            <div className="order-3">
              <p className="flex justify-between md:gap-20">
                Year of joining <span className="text-[#fddf97]">{"2018"}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="reviews">
          <p className="reviewsProduct text-lg font-semibold">
            Product Reviews
          </p>
          <div>
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
            <div className="buyerReviews flex">
              <div className="imageCust">
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
                <p className="dateReview">
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
    </div>
  );
};

export default ProductDetail;
