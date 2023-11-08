import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { currencyConverter } from "@/utils/utils";
import React from "react";

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

function Index() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 ">
        <div>
          <p className=" text-xl md:text-3xl font-bold mt-10">Wishlist</p>
        </div>
        <div className="flex justify-end mt-10">
          <input
            type="text"
            placeholder="Search in wishlist"
            className="rounded-md w-full md:w-80"
          />
        </div>
        <div className="gap-x-4 gap-y-1 grid grid-cols-2 md:grid-cols-6 mt-10">
          {imgDummy.map((e, k) => (
            <ProductCard
              key={k}
              image={e.images}
              price={2000}
              showStar={false}
              order={10}
              title="create a merge request for"
            />
          ))}
        </div>
        <div className="text-center my-10">
          <p>pagination ...</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Index;
