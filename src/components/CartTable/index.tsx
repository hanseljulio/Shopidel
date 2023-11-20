import React from "react";
import CartTableHead from "../CartTableHead";
import CartTableData from "../CartTableData";
import { ICartItems } from "@/interfaces/cart_interface";

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

const CartTable = (props: ICartTableProps) => {
  return (
    <>
      <h1
        className={`text-[20px] pb-5 ${
          props.cartItems.length === 0 ? "hidden invisible" : ""
        }`}
      >
        {props.shopName}
      </h1>
      <table
        className={`w-full border-2 ${
          props.cartItems.length === 0 ? "hidden invisible" : ""
        }`}
      >
        <tbody>
          <CartTableHead
            handleCheckAll={(e) => props.handleCheckAll(e, props.index)}
          />
          {props.cartItems.map((data, index) => (
            <CartTableData
              key={index}
              index={props.index}
              id={data.product_id}
              productImage={data.product_image_url}
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
    </>
  );
};

export default CartTable;
