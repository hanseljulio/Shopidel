import React from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";

const CarouselHome = () => {
  return (
    <div className="h-56 rounded-none w-full sm:h-64 xl:h-80 2xl:h-96 px-4 md:px-0  mx-auto lg:max-w-7xl md:items-center md:flex mt-3">
      <Carousel>
        <img
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <img
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};

export default CarouselHome;
