import React from "react";

interface ICategoryProps {
  src: string;
  alt: string;
  text: string;
}
function Category(props: ICategoryProps) {
  return (
    <div>
      <img
        src={props.src}
        alt={props.alt}
        className="rounded-full w-14 h-14 md:w-20 md:h-20 object-cover flex mx-auto"
        placeholder="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        onError={(e) => {
          (e.target as HTMLInputElement).src =
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }}
      />
      <p className="text-center text-xs md:text-sm">{props.text}</p>
    </div>
  );
}

export default Category;
