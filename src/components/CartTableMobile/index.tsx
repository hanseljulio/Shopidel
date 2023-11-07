import React from "react";
import { ICartItems } from "@/interfaces/cart_interface";
import CartTableHeadMobile from "../CartTableHeadMobile";
import CartTableDataMobile from "../CartTableDataMobile";

interface ICartTableProps {
  index: number;
  id: number;
  shopName: string;
  cartItems: ICartItems[];
  addQuantity: (id: number, index: number) => void;
  subtractQuantity: (id: number, index: number) => void;
  checkboxChange: (e: any, id: number, index: number) => void;
  deleteFunction: (id: number, index: number) => void;
  handleCheckAll: (e: any, idx: number) => void;
}

const CartTableMobile = (props: ICartTableProps) => {
  return (
    <>
      <h1
        className={`text-[20px] pb-5 text-center ${
          props.cartItems.length === 0 ? "hidden invisible" : ""
        }`}
      >
        {props.shopName}
      </h1>
      <table
        className={`mx-auto ${
          props.cartItems.length === 0 ? "hidden invisible" : ""
        }`}
      >
        <tbody>
          <CartTableHeadMobile
            handleCheckAll={(e) => props.handleCheckAll(e, props.index)}
          />
          {props.cartItems.map((data, index) => (
            <CartTableDataMobile
              key={index}
              index={props.index}
              id={data.product_id}
              price={parseInt(data.product_unit_price)}
              quantity={data.product_quantity}
              isChecked={data.isChecked}
              productName={data.product_name}
              addQuantity={props.addQuantity}
              subtractQuantity={props.subtractQuantity}
              checkboxChange={props.checkboxChange}
              deleteFunction={props.deleteFunction}
            />
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </>
  );
};

export default CartTableMobile;
