import React from "react";

const EmptyCart = () => {
  return (
    <div>
      <div className="empty-card-div flex items-center justify-center">
        <img
          alt="cart pic"
          src={"/images/emptycart.png"}
          width={250}
          height={250}
          className="w-[250px] h-[250px] object-cover"
        />
      </div>
      <h1 className="text-center">Your shopping cart looks empty!</h1>
    </div>
  );
};

export default EmptyCart;
