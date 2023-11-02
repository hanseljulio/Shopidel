import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaCartShopping, FaLocationDot, FaTruckFast } from "react-icons/fa6";

const ProductDetail = () => {
  const [count, setCount] = useState<number>(0);
  const [variationType, setVariationType] = useState<[]>([]);
  const [variation, setVariation] = useState<[]>([]);
  let stock = 10;

  const inc = () => {
    if (count >= 0 && count <= stock - 1) {
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
      <div className="grid-flow-col auto-cols-max justify-between px-4 mx-auto lg:max-w-7xl  md:flex md:px-8 gap-10 py-5">
        <div className="col imageProduct w-full">
          <Image
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="bigImage w-full"
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
            <div className="quantity flex">
              <button className="minus w-5" onClick={dec}>
                -
              </button>
              <input
                className="inputQuantity text-center"
                min={0}
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
            <div className="stock text-xs text-neutral-500 py-3">
              <p>stock</p>
            </div>
          </div>
          <div className="btn flex gap-5 mt-10">
            <button
              type="submit"
              className="flex items-center justify-center border border-[#364968] hover:shadow-md bg-[#d6e4f8] p-2 w-36 hover:bg-[#eff6fd]  transition-all duration-300"
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
        <div className="description mt-10 md:mt-0 ">
          <div className="spesification">
            <p className="text-lg font-medium border-b">
              Product Specifications
            </p>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>{"Brand"}</td>
                  <td>lorem</td>
                </tr>
                <tr>
                  <td>{"Stock"}</td>
                  <td>ipsum</td>
                </tr>
                <tr>
                  <td>{"Shipped from"}</td>
                  <td>Malang</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="desc pt-10">
            <p className="text-lg font-medium border-b">Description</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab
              pariatur suscipit, porro rerum vero ven
            </p>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ProductDetail;
