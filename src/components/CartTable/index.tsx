import React from "react";
import { ICartItems } from "@/interfaces/cart_interface";
import CartProduct from "../CartProduct";
import QuantityButton from "../QuantityButton";
import { BsTrash } from "react-icons/bs";
import { currencyConverter } from "@/utils/utils";

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

interface ICartTableHeadProps {
  handleCheckAll: (e: any) => void;
}

interface ICartTableDataProps {
  id: number;
  index: number;
  price: number;
  productImage: string;
  quantity: number;
  isChecked: boolean;
  productName: string;
  addQuantity: (id: number, index: number) => void;
  subtractQuantity: (id: number, index: number) => void;
  checkboxChange: (e: any, id: number, index: number) => void;
  deleteFunction: (id: number, index: number) => void;
}

const CartTableData = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-center">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={props.isChecked}
          onChange={(e) => props.checkboxChange(e, props.id, props.index)}
        />
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {
          <CartProduct
            productImage={props.productImage}
            productName={props.productName}
          />
        }
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price)}
      </td>
      <td className="px-[20px]">
        {
          <QuantityButton
            quantity={props.quantity}
            addQuantity={() => props.addQuantity(props.id, props.index)}
            subtractQuantity={() =>
              props.subtractQuantity(props.id, props.index)
            }
          />
        }
      </td>
      <td className="px-[20px] py-[10px] text-center">
        {currencyConverter(props.price * props.quantity)}
      </td>
      <td className="px-[20px] py-[10px] text-center">
        <button
          className="text-[25px]"
          onClick={() => props.deleteFunction(props.id, props.index)}
        >
          <BsTrash className="text-[#D84727] hover:text-amber-500" />
        </button>
      </td>
    </tr>
  );
};

const CartTableHead = (props: ICartTableHeadProps) => {
  return (
    <tr className="border-2">
      <th className="px-[20px] py-[10px] text-center w-[20px] h-[65px]">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          name="allselect"
          onChange={props.handleCheckAll}
        />
      </th>
      <th className="px-[20px] py-[10px] text-center w-[190px] h-[65px]">
        Product
      </th>
      <th className="px-[20px] py-[10px] text-center w-[150px] h-[65px]">
        Unit Price
      </th>
      <th className="px-[20px] py-[10px] text-center w-[100px] h-[65px]">
        Quantity
      </th>
      <th className="px-[20px] py-[10px] text-center w-[150px] h-[65px]">
        Total Price
      </th>
      <th className="px-[20px] py-[10px] text-center w-[100px] h-[65px]">
        Actions
      </th>
    </tr>
  );
};

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
