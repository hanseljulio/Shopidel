import React from "react";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className=" bg-[#29374e] bottom-0">
        <div className="max-w-7xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download our app </h3>
            <p> Keep buying and selling every day. </p>
            <div className="justify-center my-10 flex  items-center gap-5">
              <div className="flex flex-col gap-y-3 md:flex-row w-[50%] max-w-[450px]">
                <div className="flex items-center border w-full  rounded-lg px-4 py-2 mx-2 transition-all duration-300 hover:bg-slate-900 cursor-pointer">
                  <img
                    width={10}
                    height={10}
                    src="/vm2/images/googleplay.png"
                    className="w-6 md:w-7"
                    alt="google play"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Google Play Store </p>
                  </div>
                </div>
                <div className="flex items-center border  w-full rounded-lg px-4 py-2 mx-2 transition-all duration-300 hover:bg-slate-900 cursor-pointer">
                  <img
                    width={10}
                    height={10}
                    src="/vm2/images/applestore.png"
                    className="w-6 md:w-7"
                    alt="apple store"
                  />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Download on </p>
                    <p className="text-sm md:text-base"> Apple Store </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0 align-middle">
              &copy; Shopidel
            </p>
            <div className="order-1 md:order-2 flex">
              <span className="px-2">
                <a href="#">About us</a>
              </span>
              <span className="px-2 border-l">
                <a href="#">Privacy Policy</a>
              </span>
              <span className="px-2 border-l  flex-row  md:flex  flex gap-1 justify-center items-center align-middle">
                <div>Follow us</div>
                <div className="flex gap-x-1">
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
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
