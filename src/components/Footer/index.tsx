import React from "react";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineInsertRowRight,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import ImageProduct from "../Image";

const Footer = () => {
  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-3xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download our app </h3>
            <p> Stay buy and sell every day. </p>
            <div className="flex justify-center my-10 ">
              <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
                <ImageProduct
                  width={10}
                  height={10}
                  src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </div>
              <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                <ImageProduct
                  width={10}
                  height={10}
                  src="https://images.unsplash.com/photo-1697482036303-4c0cf56a38c3?auto=format&fit=crop&q=80&w=1973&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Apple Store </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0 align-middle">
              &copy; NAMA APLIKASi
            </p>
            <div className="order-1 md:order-2 flex">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Privacy Policy</span>
              <span className="px-2 border-l flex-row  md:flex  flex gap-1 align-middle">
                Follow us <FaFacebookF className={"align-middle"} />
                <AiOutlineTwitter className={"align-middle"} />
                <AiFillYoutube className={"align-middle"} />
                <AiOutlineInstagram />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
