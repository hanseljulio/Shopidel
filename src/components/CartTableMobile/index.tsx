import React from "react";
import { ICartItems } from "@/interfaces/cart_interface";
import CartProduct from "../CartProduct";
import { currencyConverter } from "@/utils/utils";
import QuantityButton from "../QuantityButton";
import Button from "../Button";

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

export interface ICartTableDataProps {
  id: number;
  index: number;
  productImage: string;
  price: number;
  quantity: number;
  isChecked: boolean;
  productName: string;
  addQuantity: (id: number, index: number) => void;
  subtractQuantity: (id: number, index: number) => void;
  checkboxChange: (e: any, id: number, index: number) => void;
  deleteFunction: (id: number, index: number) => void;
}

const CartTableDataMobile = (props: ICartTableDataProps) => {
  return (
    <tr className="border-2">
      <td className="px-[20px] py-[10px] text-left">
        <input
          type="checkbox"
          className="hover:cursor-pointer"
          checked={props.isChecked}
          onChange={(e) => props.checkboxChange(e, props.id, props.index)}
        />
      </td>
      <td className="px-[20px] py-[10px] text-left">
        {
          <div>
            <div className="pb-4">
              <CartProduct
                productImage={props.productImage}
                productName={props.productName}
              />
            </div>
            <div className="flex justify-between">
              <div className="left">
                <h1 className="pb-4 text-[#29374e]">
                  {currencyConverter(props.price)}
                </h1>
                <QuantityButton
                  quantity={props.quantity}
                  addQuantity={() => props.addQuantity(props.id, props.index)}
                  subtractQuantity={() =>
                    props.subtractQuantity(props.id, props.index)
                  }
                />
              </div>
              <div className="right mr-[30px]">
                <Button
                  text="Delete"
                  onClick={() => props.deleteFunction(props.id, props.index)}
                  styling="bg-red-500 px-4 py-2 text-white rounded-[8px]"
                />
              </div>
            </div>
          </div>
        }
      </td>
    </tr>
  );
};

const CartTableHeadMobile = (props: ICartTableHeadProps) => {
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
    </tr>
  );
};

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
      <br />
    </>
  );
};

export default CartTableMobile;
