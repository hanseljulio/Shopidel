import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";

interface IProductDetail {
  images: string;
  varian?: {
    type?: string;
    color?: string;
  };
}
interface IProductDetailProps {
  product: IProductDetail;
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

const ProductDetail = ({ product }: IProductDetailProps) => {
  const [count, setCount] = useState<number>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [variation, setVariation] = useState(
    "https://down-id.img.susercontent.com/file/826639af5f9af89adae9a1700f073242"
  );

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
                      alt=""
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
              <div className="flex gap-3 md:gap-2 text-sm text-neutral-600 py-3 justify-between">
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

              <div className="flex gap-x-3 my-4 mb-8">
                <p className="text-sm">Color</p>
                {imgDummy.map((n) => {
                  if (n.varian?.color !== null) {
                    return (
                      <div key={n.varian?.color}>
                        <button
                          type="submit"
                          className="border border-[#364968] text-sm py-1 px-2 hover:bg-[#d6e4f8]"
                        >
                          {n.varian?.color}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
              <></>

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

            <div className="order-3 md:order-2 description mt-10 md:mt-0 md:w-2/4">
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
                  <br />
                  SOFTWARE - OS: Windows 10 Home 64, English - Bundled Software:
                  Office Home and Student 2019
                  <br />
                  SECURITY & PRIVACY - Security Chip: Firmware TPM 2.0 -
                  Fingerprint Reader: None - Physical Locks: Kensington Nano
                  Security Slot - Other Security: Camera privacy shutter
                  <br />
                  WARRANTY Lenovo Indonesia 2-year, Depot
                  <br />
                  CERTIFICATIONS - Green Certifications: ENERGY STAR 8.0, ErP
                  Lot 3, RoHS compliant - Other Certifications: TÜV Rheinland
                  Low Blue Light
                  <br />
                  Isi: • Laptop • Adaptor • Panduan • Tas Laptop
                  <br />
                  CATATAN: - Windows terinstall dari pabrik & lisensi digital
                  akan teraktivasi otomatis saat terkoneksi internet stabil.
                  Proses Windows update butuh proses cukup lama & laptop akan
                  restart beberapa kali - Lisensi Office Home & Student sudah
                  pre-installed dari pabrik & berupa digital - Tambah catatan:
                  videokan unboxing, update Windows & driver jika ingin dibantu
                  update & cek fisik sebelum dikirim. Video akan disimpan di
                  dalam laptopnya. - Driver laptop sudah ada dari pabrik & dapat
                  diupdate melalui aplikasi Lenovo Vantage. Driver tersedia di
                  web:
                </p>
              </div>
            </div>
          </div>
          <div className="seller flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1  w-3/4">
              <div className="sellerShop bg-[#364968] flex flex-row gap-y-5 text-white py-3 my-10 gap-10 px-5 ">
                <Image
                  width={90}
                  height={0}
                  src={"/images/defaultuser.png"}
                  alt="seller"
                  className="imgSeller w-20 h-full"
                />
                <div className="flex flex-col md:flex-row gap-y-4 gap-x-48">
                  <div className="aboutSeller justify-between w-1/2 md:w-full">
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
            <div className="order-2 w-full md:w-1/4 items-center flex flex-col md:flex-row md:justify-end mt-5">
              <div className="md:w-3/4 content-center">
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
