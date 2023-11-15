import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { API } from "@/network";
import axios from "axios";
import { toast } from "react-toastify";

const CarouselHome = () => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const res = await API.get(`/products/banners`);
      const data = res.data.data;
      setImages(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="h-56 rounded-none w-full sm:h-64 xl:h-80 2xl:h-96 px-4 md:px-0  mx-auto lg:max-w-7xl md:items-center md:flex mt-3">
      <Carousel>
        {images.map((e, i) => (
          <img key={i} height={100} width={100} src={e} alt="..." />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
