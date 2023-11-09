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
        src={`/categories/${props.src}`}
        alt={props.alt}
        className="rounded-full w-14 h-14 md:w-20 md:h-20 object-cover flex mx-auto"
      />
      <p className="text-center text-xs md:text-sm">{props.text}</p>
    </div>
  );
}

export default Category;
