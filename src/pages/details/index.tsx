import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";

const ProductDetail = () => {
  const [count, setCount] = useState<number>(0);

  const inc = () => {
    if (count >= 0) {
      setCount(count + 1);
    }
  };

  const dec = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3  justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 gap-4  ">
        <div className="imageProduct">
          <Image
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="variation">
            <Image width={100} height={100} src="" alt="" />
          </div>
        </div>
        <div className="purchaseBox border border-[#f57b29] p-5">
          <p className="productTitle text-lg font-medium">
            Lorem ipsum dolor sit amet
          </p>
          <div className="historyProduct flex align-middle text-xs">
            <span className="pr-3"> Sold 2000 </span>
            <span className="px-3 border-l border-slate-600 flex-row  md:flex flex gap-1 items-center">
              <BsStarFill style={{ color: "#f57b29" }} />5
            </span>
          </div>
          <p className="productPrice text-xl font-semibold text-[#f57b29]">
            Rp.10.000
          </p>
          <div className="grid grid-cols-2 text-sm text-neutral-600">
            <p className="pl-5">Pengiriman</p>
            <div>
              <div className="flex items-center">
                <FaLocationDot /> {"Malang"}
              </div>
              <div className="flex items-center">
                <FaTruckFast /> {`Jakarta Selatan ${""}`}
              </div>
            </div>
          </div>

          <div className="grid-cols-2 text-center">
            <div className="quantity flex">
              <button className="minus w-5" onClick={dec}>
                -
              </button>
              <input
                className="inputQuantity text-center"
                min={0}
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
            <div className="stock">
              <p>stock</p>
            </div>
          </div>
        </div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab
          pariatur suscipit, porro rerum vero veniam nihil harum dolorum debitis
          adipisci aperiam perspiciatis quam mollitia et similique unde
          doloremque labore delectus enim? Quis dignissimos asperiores
          voluptatum quaerat quod, vel assumenda optio quibusdam illum! Ex quae
          rem aliquam debitis incidunt eligendi.
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
