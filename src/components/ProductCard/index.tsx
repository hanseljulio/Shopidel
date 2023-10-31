import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { BsStarFill } from "react-icons/bs";
import Image from "next/image";

interface IProductCard {
  image: string;
  price: number;
  order: number;
  title: string;
  place: string;
  star?: number;
  onClick?: MouseEventHandler;
}
const ProductCard = ({
  image,
  price,
  order,
  title,
  place,
  star,
  onClick,
}: IProductCard) => {
  return (
    <button
      onClick={onClick}
      className={classNames([
        "bg-white lg:min-w-45  hover:shadow-2xl shadow-md hover:shadow-none cursor-pointer w-65 rounded-md flex flex-col items-center justify-center transition-all duration-500 ease-in-out text-left",
      ])}
    >
      <div className={"relative mt-2 mx-2"}>
        <div className={"h-56 rounded-md overflow-hidden"}>
          <Image
            width={50}
            height={50}
            src={image}
            className={"object-cover w-full h-full"}
            alt=""
          />
        </div>
        <div className={"absolute bottom-0 left-0 -mb-4 ml-3 flex flex-row"}>
          <div
            className={classNames(
              "h-10 w-fit px-2 flex items-center justify-center text-sm bg-white hover:bg-red-500 text-[#f57b29] hover:text-white rounded-2xl shadow-xl"
            )}
          >
            <BsStarFill />
            <span
              className={classNames(
                "text-gray-500 ml-2 group-hover:text-white"
              )}
            >
              {star}
            </span>
          </div>
        </div>
      </div>
      <div className=" pt-10 pb-6 w-full px-4">
        <p className=" tracking-wider text-black">
          {title.length > 25 ? `${title.substring(0, 30)}...` : title}{" "}
        </p>
        <p className=" tracking-wider text-[#f57b29]">{`Rp. ${price}`}</p>{" "}
        <div className="flex justify-between text-sm">
          <p> {place} </p>
          <p className="text-gray-500 "> {`${order} sold`}</p>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
