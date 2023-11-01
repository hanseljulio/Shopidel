import React from "react";
import { Carousel } from "flowbite-react";
import ImageProduct from "../Image";

const CarouselHome = () => {
  return (
    <div className="h-56 w-full  sm:h-64 xl:h-80 2xl:h-96 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
      <Carousel>
        <ImageProduct
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <ImageProduct
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <ImageProduct
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <ImageProduct
          height={100}
          width={100}
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <ImageProduct
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
