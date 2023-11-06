import React from "react";
import CartTableHead from "../CartTableHead";
import CartTableData from "../CartTableData";
import { ICartData, ICartItems } from "@/interfaces/cart_interface";

interface ICartTableProps {
  index: number;
  id: number;
  shopName: string;
  cartItems: ICartItems[];
  addQuantity: (id: number) => void;
  subtractQuantity: (id: number) => void;
  checkboxChange: (e: any, id: number, index: number) => void;
  deleteFunction: (id: number) => void;
  handleCheckAll: (e: any, idx: number) => void;
}

const CartTable = (props: ICartTableProps) => {
  return (
    <>
      <h1 className="text-[20px] pb-5">{props.shopName}</h1>
      <table className="w-full border-2">
        <tbody>
          <CartTableHead
            handleCheckAll={(e) => props.handleCheckAll(e, props.index)}
          />
          {props.cartItems.map((data, index) => (
            <CartTableData
              key={index}
              index={props.index}
              id={data.id}
              price={parseInt(data.product_unit_price)}
              quantity={data.product_quantity}
              isChecked={data.isChecked}
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
