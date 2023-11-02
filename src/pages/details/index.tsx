import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";

const ProductDetail = () => {
  const [count, setCount] = useState<number>(0);
  const [variationType, setVariationType] = useState<[]>([]);
  const [variation, setVariation] = useState<[]>([]);

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
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 gap-4  py-5 ">
        <div className="col imageProduct w-[1050px]">
          <Image
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="bigImage w-[450px]"
          />
          <div className="variation">
            <Image width={100} height={100} src="" alt="" />
          </div>
        </div>
        <div className="col purchaseBox border border-[#f57b29] p-5">
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
          <div className="flex gap-10 text-sm text-neutral-600 py-3">
            <p className="pl-5">Pengiriman</p>
            <div>
              <div className="flex items-center gap-2">
                <FaLocationDot /> {"Malang"}
              </div>
              <div className="flex items-center gap-2">
                <FaTruckFast /> {`Jakarta Selatan ${"Rp3000"}`}
              </div>
            </div>
          </div>

          <div className="flex text-center items-center">
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
            <div className="stock text-xs text-neutral-500 py-3">
              <p>stock</p>
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
      <div className=""></div>
    </div>
  );
};

export default ProductDetail;
