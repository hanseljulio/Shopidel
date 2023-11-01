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
      <div className=" bg-[#29374e]">
        <div className="max-w-3xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download our app </h3>
            <p> Keep buying and selling every day. </p>
            <div className="flex justify-center my-10 ">
              <div className="flex items-center border w-40 md:w-auto rounded-lg px-4 py-2  mx-2">
                <ImageProduct
                  width={10}
                  height={10}
                  src="/images/googleplay.png"
                  className="w-6 md:w-7"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </div>
              <div className="flex items-center border  w-40 md:w-44 rounded-lg px-4 py-2 mx-2">
                <ImageProduct
                  width={10}
                  height={10}
                  src="/images/applestore.png"
                  className="w-6 md:w-7"
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
              <span className="px-2">
                <a href="#">About us</a>
              </span>
              <span className="px-2 border-l">
                <a href="#">Privacy Policy</a>
              </span>
              <span className="px-2 border-l flex-row  md:flex  flex gap-1 align-middle">
                Follow us
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <AiOutlineTwitter />
                </a>
                <a href="#">
                  <AiFillYoutube />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
