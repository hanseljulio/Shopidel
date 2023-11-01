import React from "react";
import Image from "next/image";

interface IImageProduct {
  height: number;
  width: number;
  alt?: string | any;
  src: string;
  className?: string;
}
const ImageProduct = ({
  height,
  width,
  alt,
  src,
  className,
}: IImageProduct) => {
  return (
    <>
      <Image
        height={height}
        width={width}
        src={src}
        alt={alt}
        className={className}
      />
    </>
  );
};

export default ImageProduct;
