import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full bg-[#29374e] shadow px-4 md:px-0">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex text-white text-sm ">
        <div className="justify-between md:items-center md:flex  pt-3">
          <p>
            <a href="#">Seller Centre</a>
          </p>
        </div>
      </div>
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex ">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-3xl font-bold text-white">LOGO</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <input
              className="items-center justify-center w-full md:w-[20rem] lg:w-[50rem] px-3 py-1"
              type="text"
              name="search"
              id="search"
              placeholder="Search"
            />
            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <Link
                href="/cart"
                className=" w-full  px-3 py-1 justify-center text-white bg-[#e09664] rounded-md shadow hover:bg-gray-800 flex align-middle"
              >
                <AiOutlineShoppingCart size={23} />
              </Link>
              <a
                href="javascript:void(0)"
                className="inline-block w-full px-3 py-1 text-center text-[#6c4343] bg-[#fddf97] rounded-md shadow hover:bg-gray-800"
              >
                Sign in
              </a>
              <a
                href="javascript:void(0)"
                className="inline-block w-full px-3 py-1 text-center text-[#364968] bg-white rounded-md shadow hover:bg-gray-100"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden space-x-4 md:inline-block align-middle">
          <button className=" text-white rounded-md shadow align-middle">
            <AiOutlineShoppingCart size={30} />
          </button>
          <button className="px-3 py-2 text-[#6c4343] bg-[#fddf97] rounded-md shadow transition-all duration-300 hover:bg-[#e09664] hover:text-[#fddf97]">
            Sign in
          </button>
          <button className="px-3 py-2 text[#364968] bg-white rounded-md shadow transition-all duration-300 hover:bg-[#6c4343]  hover:text-white">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
