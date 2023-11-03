import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";

interface IProductDetail {
  images: {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    image8: string;
  };
}
const imgDummy: IProductDetail[] = [
  {
    images: {
      image1: "/images/applestore.png",
      image2: "/images/defaultuser.png",
      image3: "/images/auth_hero.png",
      image4: "/images/applestore.png",
      image5: "/images/defaultuser.png",
      image6: "/images/auth_hero.png",
      image7: "/images/applestore.png",
      image8: "/images/defaultuser.png",
    },
  },
];

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
        <div className="flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
          <div className="order-1 md:order-1 imageProduct w-full md:w-1/4">
            <Image
              width={100}
              height={100}
              src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="bigImage w-full"
            />
            <div className="variation flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {imgDummy.map((product) => {
                return (
                  <>
                    <Image
                      className="cursor-pointer"
                      width={100}
                      height={100}
                      src={product.images.image1}
                      alt=""
                    />
                    <Image
                      className="cursor-pointer"
                      width={100}
                      height={100}
                      src={product.images.image2}
                      alt=""
                    />
                    <Image
                      className="cursor-pointer"
                      width={100}
                      height={100}
                      src={product.images.image3}
                      alt=""
                    />
                    <Image
                      className="cursor-pointer"
                      width={100}
                      height={100}
                      src={product.images.image4}
                      alt=""
                    />
                    <Image
                      className="cursor-pointer"
                      width={100}
                      height={100}
                      src={product.images.image5}
                      alt=""
                    />
                  </>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab
                pariatur suscipit, porro rerum vero ven. Lorem ipsum, dolor sit
                amet consectetur adipisicing elit. Deleniti explicabo
                dignissimos veritatis sapiente quibusdam possimus labore unde?
                Fugit, vitae reprehenderit? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Dolorum nesciunt voluptates
                obcaecati quaerat aspernatur molestias necessitatibus
                praesentium animi maxime magnam quasi vitae hic exercitationem
                error, sequi eos ullam illo repellat sunt debitis laudantium
                quibusdam. Quod aperiam sed nam fugit corporis maxime sunt
                architecto aliquam distinctio quis exercitationem reprehenderit
                soluta dolores suscipit praesentium, voluptate ad molestiae
                placeat quam. Quod incidunt corporis consequatur neque hic
                harum, nam sequi tempore, nostrum at aperiam a magni ab
                perspiciatis impedit nulla modi error ut animi odio aliquid
                porro. Fugiat error sapiente dicta doloremque quia fugit earum
                ducimus nam tenetur similique ipsum, harum dolorem ipsam enim?
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti beatae officiis at esse placeat quis laboriosam,
                repellat sed iure et saepe unde atque ex odio labore tempora
                molestias, quasi quas quos deserunt quidem ipsam totam? Animi
                neque deserunt nostrum quod architecto! Asperiores cum facere
                consequatur rerum voluptatum quae dicta. Sit delectus, eius
                possimus repellendus maiores veritatis, consequatur voluptates
                fugit consectetur doloribus quis repudiandae ratione impedit
                alias? Repellat quibusdam at quis consequatur sed blanditiis
                aliquam reprehenderit laudantium. Quia ab molestiae, quibusdam,
                dolores quisquam, nulla neque maxime alias harum nemo eaque
                omnis! Obcaecati ipsa esse itaque consequatur molestiae, numquam
                excepturi. Magnam exercitationem iusto accusantium voluptatum
                quaerat id saepe, debitis maxime, reiciendis obcaecati unde
                excepturi numquam est, inventore autem deleniti suscipit dolores
                natus odit. Dolores dicta adipisci veniam illum repellendus
                quaerat magni distinctio alias magnam? Laborum iure est saepe
                doloribus culpa numquam, eos asperiores repellendus eaque!
                Earum, omnis sed. Neque natus quidem nulla. Magni porro tenetur
                culpa sint explicabo ducimus quos magnam, eos eveniet dolorum
                nam consectetur voluptatibus consequuntur animi inventore ut.
                Rerum quae maxime accusantium est quas architecto excepturi
                voluptates atque? Illum atque rem numquam, reiciendis
                reprehenderit possimus cum blanditiis ad minima animi eos esse
                repudiandae, commodi hic itaque mollitia expedita, in harum
                fugit modi dolores! Officiis ut veniam id tenetur nemo
                repudiandae deserunt labore ipsam. Eos accusantium adipisci
                nobis sit necessitatibus nemo odio quos, consectetur voluptatum
                libero mollitia nisi expedita animi molestiae pariatur quam
                voluptatibus in. Voluptatibus natus reiciendis asperiores
                quaerat odit! Nihil optio eveniet laboriosam, dolorum distinctio
                deserunt dignissimos. Possimus, eligendi provident. Sunt quam
                repellendus corporis porro dolorum expedita voluptates, officiis
                accusantium odio! Amet earum quam, quisquam odio distinctio
                mollitia, quis nobis vel eligendi debitis facere vero recusandae
                accusamus non provident deserunt, adipisci optio soluta libero
                illo aspernatur beatae. Animi id eveniet possimus quis
                consequatur, laudantium reprehenderit rerum incidunt aliquam.
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
              <div className="aboutSeller justify-between w-1/2 md:w-full">
                <p>Nama Toko</p>
                <p>
                  <button className="flex gap-1 md:gap-2 mt-3 text-sm items-center w-full border border-[#fddf97] hover:shadow-lg   p-1 md:w-36 text-[#fddf97] hover:bg-[#1c2637]  transition-all duration-300">
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
                <p className="flex gap-5 md:gap-14">
                  Product <span>30</span>
                </p>
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
                <div className="buyerReviews flex mt-5">
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
                    <p className="dateReview text-sm text-neutral-500">
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
          <div className="order-2 w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
