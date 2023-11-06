import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart";
import CartTableHead from "@/components/CartTableHead";
import CartTableData from "@/components/CartTableData";
import CartCheckoutArea from "@/components/CartCheckoutArea";
import CartTableHeadMobile from "@/components/CartTableHeadMobile";
import CartTableDataMobile from "@/components/CartTableDataMobile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartTable from "@/components/CartTable";

interface IDataTest {
  id: number;
  productId: number;
  price: number;
  quantity: number;
  isChecked: false;
}

const CartPage = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dataTest, setDataTest] = useState<IDataTest[]>([
    {
      id: 1,
      productId: 1,
      price: 50000,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 2,
      productId: 2,
      price: 30000,
      quantity: 2,
      isChecked: false,
    },
    {
      id: 3,
      productId: 3,
      price: 40000,
      quantity: 3,
      isChecked: false,
    },
    {
      id: 4,
      productId: 4,
      price: 20000,
      quantity: 4,
      isChecked: false,
    },
  ]);

  const [dataTest2, setDataTest2] = useState([
    {
      shop_id: 1,
      shop_name: "XYZ SHOP",
      cart_items: [
        {
          id: 1,
          product_image_url:
            "https://down-id.img.susercontent.com/file/68171f9daf6be781832415086d2c18e2",
          product_name: "Minyak Goreng Refill Rose Brand 2L",
          product_unit_price: "5000000",
          product_quantity: 2,
          product_total_price: "10000000",
          isChecked: false,
        },
        {
          id: 2,
          product_image_url:
            "https://down-id.img.susercontent.com/file/68171f9daf6be781832415086d2c18e2",
          product_name:
            "Schneider Electric Leona Saklar Lampu - 2 Gang 2 Arah - LNA0600321",
          product_unit_price: "2500000",
          product_quantity: 1,
          product_total_price: "2500000",
          isChecked: false,
        },
      ],
    },
    {
      shop_id: 3,
      shop_name: "Satria Shop",
      cart_items: [
        {
          id: 1,
          product_image_url:
            "https://down-id.img.susercontent.com/file/68171f9daf6be781832415086d2c18e2",
          product_name: "Magsafe 2 Charger macbook 45w l 60w AIR l PRO - 45W",
          product_unit_price: "5000000",
          product_quantity: 1,
          product_total_price: "5000000",
          isChecked: false,
        },
      ],
    },
  ]);

  const addQuantity = (id: number) => {
    const currentData = [...dataTest];

    const updatedData = currentData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          quantity: data.quantity < 99 ? data.quantity + 1 : data.quantity,
        };
      } else {
        return data;
      }
    });

    setDataTest(updatedData);
    getTotal(updatedData);
  };

  const subtractQuantity = (id: number) => {
    const currentData = [...dataTest];

    const updatedData = currentData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          quantity: data.quantity > 1 ? data.quantity - 1 : data.quantity,
        };
      } else {
        return data;
      }
    });

    setDataTest(updatedData);
    getTotal(updatedData);
  };

  const handleCheckAll = (e: any, index: number) => {
    const { checked } = e.target;
    const currentData = [...dataTest2];
    console.log(currentData[index]);

    currentData[index].cart_items = currentData[index].cart_items.map(
      (data) => {
        return { ...data, isChecked: checked };
      }
    );

    setDataTest2(currentData);
    // getTotal(updatedData);
  };

  const handleCheck = (e: any, id: number, index: number) => {
    const { checked } = e.target;
    const currentData = [...dataTest2];

    currentData[index].cart_items = currentData[index].cart_items.map(
      (data) => {
        if (data.id === id) {
          return { ...data, isChecked: checked };
        } else {
          return data;
        }
      }
    );

    setDataTest2(currentData);
    //getTotal(updatedData);
  };

  const getTotal = (updatedData: IDataTest[]) => {
    let newTotal = 0;
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].isChecked) {
        newTotal += updatedData[i].price * updatedData[i].quantity;
      }
    }

    setTotalPrice(newTotal);
  };

  const deleteCart = () => {
    setDataTest([]);
  };

  const deleteItem = (id: number) => {
    const currentData = [...dataTest];

    const updatedData = currentData.filter((data) => {
      return data.id !== id;
    });

    setDataTest(updatedData);
    getTotal(updatedData);
  };

  const checkEmptySelection = () => {
    for (let i = 0; i < dataTest.length; i++) {
      if (dataTest[i].isChecked) {
        return false;
      }
    }

    return true;
  };

  const goToCheckout = async (e: any) => {
    e.preventDefault();
    const emptySelectionMessage = () =>
      toast.error("Please select an item before checking out.");

    const movingToCheckout = () => toast.success("Redirecting to checkout...");

    if (checkEmptySelection()) {
      emptySelectionMessage();
      return;
    }

    setTimeout(() => {
      router.push("/checkout");
    }, 3000);

    movingToCheckout();
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="lg:max-w-7xl mx-auto">
        <div className="flex mt-[30px] justify-between mobile:block">
          <h1 className="text-[30px] mobile:text-center">My Cart</h1>
          {dataTest.length !== 0 && (
            <Button
              text="Delete All"
              onClick={deleteCart}
              styling="bg-red-500 px-6 text-white rounded-[8px] mobile:hidden mobile:invisible"
            />
          )}
        </div>
        {dataTest.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <div className="pt-8 pb-[150px]">
              <div className="hidden invisible mobile:visible mobile:block">
                <table className="mx-auto">
                  <tbody>
                    <CartTableHeadMobile handleCheckAll={() => {}} />
                    {dataTest.map((data, index) => (
                      <CartTableDataMobile
                        key={index}
                        id={data.id}
                        price={data.price}
                        quantity={data.quantity}
                        isChecked={data.isChecked}
                        addQuantity={addQuantity}
                        subtractQuantity={subtractQuantity}
                        checkboxChange={() => {}}
                        deleteFunction={deleteItem}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mobile:hidden mobile:invisible">
                {dataTest2.map((data, idx) => {
                  return (
                    <CartTable
                      key={idx}
                      index={idx}
                      id={data.shop_id}
                      shopName={data.shop_name}
                      cartItems={data.cart_items}
                      addQuantity={addQuantity}
                      subtractQuantity={subtractQuantity}
                      handleCheckAll={handleCheckAll}
                      checkboxChange={handleCheck}
                      deleteFunction={deleteItem}
                    />
                  );
                })}
              </div>
              <div className="hidden invisible mobile:visible mobile:flex mobile:justify-center py-4">
                {dataTest.length !== 0 && (
                  <Button
                    text="Delete All"
                    onClick={deleteCart}
                    styling="bg-red-500 px-6 text-white rounded-[8px] mobile:py-2 mobile:mt-3"
                  />
                )}
              </div>
            </div>
            <CartCheckoutArea
              totalPrice={totalPrice}
              checkoutFunction={goToCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
