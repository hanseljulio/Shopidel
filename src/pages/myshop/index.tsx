import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

interface IRegisterMerchant {
  name: string;
  addressId: number;
}

const MyShop = () => {
  return <RegisterShop />;
};

const RegisterShop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterMerchant>();

  const registerMerchantHandler: SubmitHandler<IRegisterMerchant> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center">
        <ToastContainer />
        <div className="flex max-w-7xl w-full justify-around">
          <img src="/images/seller_regis.png" alt="seller_regis_logo" />
          <div className=" flex flex-col justify-center w-96">
            <h1>
              Hi, <span className="font-bold">Kevin Joshua Pulung</span>
            </h1>
            <p className="text-sm">Lets start your journey as a seller</p>
            <form
              className="mt-5 flex flex-col gap-y-5"
              onSubmit={handleSubmit(registerMerchantHandler)}
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm">
                  Shop name
                </label>
                <input
                  {...register("name", {
                    validate: {
                      required: (v) => v !== "" || "Shop name is required",
                    },
                  })}
                  name="name"
                  id="name"
                  className="rounded-md border p-2"
                />
                {errors.name?.types === errors.name?.types?.validate && (
                  <p role="alert" className="text-xs text-red-500 mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="addressId" className="text-sm">
                  Shop address
                </label>
                <select
                  {...register("addressId")}
                  name="addressId"
                  id="addressId"
                  className="rounded-md border p-2 border-slate-200"
                >
                  <option value="1">test1</option>
                  <option value="1">test2</option>
                  <option value="1">test3</option>
                  <option value="1">test4</option>
                </select>
              </div>
              <div className="mt-5">
                <Button
                  text="Register my shop"
                  styling="p-2 bg-[#364968] w-full rounded-md text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyShop;
