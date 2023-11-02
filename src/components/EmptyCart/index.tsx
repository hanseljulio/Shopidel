import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../Button";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div>
      <div className="empty-card-div flex items-center justify-center mt-[30px]">
        <Image
          alt="cart pic"
          src={"/images/emptycart.png"}
          width={250}
          height={250}
          objectFit="cover"
          className="w-[250px] h-[250px]"
        />
      </div>
      <h1 className="text-center">Your shopping cart looks empty!</h1>
      <div className="flex justify-center">
        <Button
          text="Go Shopping Now"
          styling="bg-[#364968] p-3 rounded-[8px] w-[300px] text-white my-4"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default EmptyCart;
