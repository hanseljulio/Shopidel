import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { BsStarFill } from "react-icons/bs";
import { currencyConverter } from "@/utils/utils";

interface IProductCard {
  image: string;
  price: string;
  order?: string | number;
  title: string;
  place?: string;
  star?: number;
  onClick?: MouseEventHandler;
  showStar: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

const abbreviatePlace = (place: string): string => {
  if (place && place.startsWith("Kabupaten ")) {
    return place.replace("Kabupaten ", "Kab. ");
  }
  return place;
};

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
  const abbreviatedPlace = place ? abbreviatePlace(place) : place;
  return (
    <div
      onClick={onClick}
      className={classNames([
        "w-full  transform items-start justify-start  hover:scale-95 h-fit md:w-full object-cover overflow-hidden shadow-md hover:shadow-none cursor-pointer rounded-md flex flex-col align-middle  transition-all duration-500 ease-in-out text-left",
      ])}
    >
      <div className={"relative h-44 md:h-48 w-full"}>
        <div className={" h-auto md:h-full w-auto overflow-hidden top-0"}>
          <img
            src={image}
            className={"object-fill w-full h-44 md:h-48 top-0"}
            alt=""
          />
        </div>
        {showStar === true && (
          <div className={"absolute bottom-0 left-0 -mb-4  ml-3 flex flex-row"}>
            <div
              className={classNames(
                "h-10 w-fit px-2 flex items-center justify-center text-sm bg-white hover:shadow-none text-[#f57b29]  rounded-2xl shadow-xl"
              )}
            >
              <BsStarFill />
              <span
                className={classNames(
                  "text-gray-500 ml-2 group-hover:text-white items-center"
                )}
              >
                {star}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 pb-3 md:pt-5 w-full px-2 gap-y-2 flex flex-col ">
        <p className="text-black text-sm md:text-base pt-2 row-span-2 w-full line-clamp-2 md:h-14">
          {title}
        </p>
        <p className="text-[#f57b29] text-sm md:text-xl">
          {currencyConverter(parseInt(price))}
        </p>

        <div className="flex justify-between text-gray-500 text-xs md:text-sm items-end">
          {abbreviatedPlace && (
            <p className="text-gray-500 ">
              {abbreviatedPlace.length > 15
                ? `${abbreviatedPlace.substring(0, 12)}...`
                : abbreviatedPlace}
            </p>
          )}
          {order !== undefined && (
            <td className={`text-gray-500`}>{order} Sold</td>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
