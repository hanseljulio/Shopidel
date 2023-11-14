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
  selected?: boolean;
  onSelect?: () => void;
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
        "w-full h-auto] md:w-full md:h-auto bg-white overflow-hidden shadow-md hover:shadow-none cursor-pointer rounded-md flex flex-col items-center align-middle justify-center transition-all duration-500 ease-in-out text-left",
      ])}
    >
      <div className={"relative w-full md "}>
        <div className={" h-auto md:h-48 w-auto overflow-hidden"}>
          <img
            width={100}
            height={100}
            src={image}
            className={"object-cover w-full h-auto md:h-full "}
            alt=""
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

      <div className="pt-3 pb-3 md:pt-5  md:pb-6 w-full px-4 ">
        <p className=" tracking-wider text-black text-sm md:text-base pt-2">
          {title?.length > 20 ? `${title.substring(0, 23)}...` : title}
        </p>
        <p className=" tracking-wider text-[#f57b29] text-sm md:text-base">
          {currencyConverter(parseInt(price))}
        </p>

        <div className="flex justify-between text-xs md:text-sm pt-2">
          <p className="text-gray-500 ">
            {place && place?.length > 15
              ? `${title.substring(0, 12)}...`
              : place}
          </p>
          <p className="text-gray-500 "> {`${order} sold`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
