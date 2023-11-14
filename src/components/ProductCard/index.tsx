import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { BsStarFill } from "react-icons/bs";
import Image from "next/image";
import { currencyConverter } from "@/utils/utils";

interface IProductCard {
  image: string;
  price: string;
  order?: number;
  title: string;
  place?: string;
  star?: number;
  onClick?: MouseEventHandler;
  showStar: boolean;
}
const ProductCard = ({
  image,
  price,
  order,
  title,
  place,
  star,
  onClick,
  showStar,
}: IProductCard) => {
  return (
    <div
      onClick={onClick}
      className={classNames([
        "w-full h-auto md:w-full object-cover md:h-auto bg-white overflow-hidden shadow-md hover:shadow-none cursor-pointer rounded-md flex flex-col items-center align-middle justify-center transition-all duration-500 ease-in-out text-left",
      ])}
    >
      <div className={"w-full h-full"}>
        <div className={"h-48 w-full overflow-hidden"}>
          <img
            src={image}
            className={"object-cover w-full h-full"}
            alt="image product"
            placeholder="/images/noimage.png"
            onError={(e) => {
              (e.target as HTMLInputElement).src = "/images/noimage.png";
            }}
          />
        </div>
        {showStar === true && (
          <div className={"absolute bottom-0 left-0 -mb-4 ml-3 flex flex-row"}>
            <div
              className={classNames(
                "h-10 w-fit px-2 flex items-center justify-center text-sm bg-white hover:shadow-none text-[#f57b29]  rounded-2xl shadow-xl"
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
        )}
      </div>

      <table className="px-3 pb-3 md:p-5  md:pb-6 w-full h-full justify-between flex-col">
        <thead></thead>
        <tbody className="p-3">
          <tr>
            <td className=" tracking-wider text-black text-sm md:text-base pt-2 items-start col-span-2 px-3 p-2">
              {title?.length > 20 ? `${title.substring(0, 20)}...` : title}
            </td>
          </tr>
          <tr>
            <td className=" tracking-wider text-[#f57b29] text-sm md:text-base col-span-2 px-3">
              {currencyConverter(parseInt(price))}
            </td>
          </tr>

          <tr className="flex justify-between text-xs md:text-sm py-2 px-3">
            <td className="text-gray-500 ">
              {place && place?.length > 15
                ? `${place.substring(0, 12)}...`
                : place}
            </td>
            <td className="text-gray-500 "> {`${order} sold`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductCard;
