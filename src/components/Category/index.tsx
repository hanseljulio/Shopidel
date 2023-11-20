import React, { MouseEventHandler } from "react";

interface ICategoryProps {
  src: string;
  alt: string;
  text: string;
  onClick?: MouseEventHandler;
}
function Category({ src, alt, text, onClick }: ICategoryProps) {
  return (
    <div
      onClick={onClick}
      className="hover:border hover:border-neutral-200 h-32  cursor-pointer"
    >
      <img
        src={src}
        alt={alt}
        className="rounded-full w-14 h-14 md:w-20 md:h-20 object-cover flex mx-auto"
        placeholder="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        onError={(e) => {
          (e.target as HTMLInputElement).src =
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }}
      />
      <p className="text-center text-xs md:text-sm">{text}</p>
    </div>
  );
}

export default Category;
