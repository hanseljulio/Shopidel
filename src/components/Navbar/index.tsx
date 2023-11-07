import { useUserStore } from "@/store/userStore";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../Button";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { IAPIUserProfileResponse } from "@/interfaces/api_interface";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const { user, updateUser } = useUserStore();
  const [logged, setLogged] = useState<IAPIUserProfileResponse | undefined>(
    undefined
  );
  const [query, setQuery] = useState<string>();

  const logoutHandler = () => {
    deleteCookie("accessToken");
    updateUser(undefined);
    router.push("/");
  };

  const searchQueryHandler = () => {
    router.push({
      pathname: "/search",
      query: {
        q: query,
      },
    });
  };

  useEffect(() => {
    setLogged(user!);
  }, [user]);

  return (
    <nav className="w-full bg-[#29374e] shadow px-4 md:px-0">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex text-white text-sm ">
        <div className="justify-between md:items-center md:flex  pt-3">
          <p>
            <Link href="/myshop">Seller Centre</Link>
          </p>
        </div>
      </div>
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex ">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="text-3xl font-bold text-white">LOGO</h2>
            </Link>
            <div className="md:hidden flex items-center">
              <Link href="/cart" className=" w-full  px-3 py-1 ">
                <AiOutlineShoppingCart size={23} color={"white"} />
              </Link>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchQueryHandler();
              }}
            >
              <input
                className="items-center justify-center w-full md:w-[20rem] lg:w-[50rem] px-3 py-1"
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                name="search"
                id="search"
                placeholder="Search"
              />
            </form>
            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
              <div className="flex flex-col gap-y-2">
                {logged ? (
                  <>
                    <div className="py-2 flex gap-x-2 items-center hover:bg-slate-100 transition text-white">
                      <IoSettingsSharp />
                      <Button
                        text="Account settings"
                        styling="w-full text-start text-sm"
                        onClick={() => router.push("/user/profile")}
                      />
                    </div>
                    <div className="py-2 flex gap-x-2 items-center hover:bg-slate-100 transition text-white">
                      <BiLogOut />
                      <Button
                        text="Logout"
                        styling="w-full text-start text-sm"
                        onClick={logoutHandler}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="javascript:void(0)"
                      className="inline-block w-full px-3 py-1 text-center text-[#6c4343] bg-[#fddf97] rounded-md shadow hover:bg-gray-800"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="javascript:void(0)"
                      className="inline-block w-full px-3 py-1 text-center text-[#364968] bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden space-x-4 md:flex align-middle">
          <button
            className=" text-white rounded-md shadow align-middle"
            onClick={() => router.push("/cart")}
          >
            <AiOutlineShoppingCart size={30} />
          </button>
          <div className="flex gap-x-2 justify-center items-center">
            {logged ? (
              <div className="flex gap-x-2 group hover:cursor-pointer relative">
                <div className="w-5">
                  <img
                    src={logged.profile_picture}
                    alt="profile_picture"
                    placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                    onError={(e) => {
                      (e.target as HTMLInputElement).src =
                        "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                    }}
                  />
                </div>
                <p className="text-white text-sm w-16 truncate">
                  {user?.full_name}
                </p>
                <div className="invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-150 w-72 bg-white absolute top-12 right-0 z-50 rounded-bl-md rounded-br-md overflow-hidden shadow-lg">
                  <div className="px-5 pt-5 flex items-center gap-x-5 justify-between">
                    <p className="w-full truncate">
                      Hi, <span className="font-bold">{user?.full_name}</span>
                    </p>
                    <div className="w-10">
                      <img
                        src={logged.profile_picture}
                        alt="profile_picture"
                        placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                        onError={(e) => {
                          (e.target as HTMLInputElement).src =
                            "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="px-5 py-3 flex gap-x-2 items-center hover:bg-slate-100 transition">
                      <IoSettingsSharp />
                      <Button
                        text="Account settings"
                        styling="w-full text-start text-sm"
                        onClick={() => router.push("/user/profile")}
                      />
                    </div>
                    <div className="px-5 py-3 flex gap-x-2 items-center hover:bg-slate-100 transition ">
                      <BiLogOut />
                      <Button
                        text="Logout"
                        styling="w-full text-start text-sm"
                        onClick={logoutHandler}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-2">
                <button
                  onClick={() => router.push("/login")}
                  className="px-3 py-2 text-[#6c4343] bg-[#fddf97] rounded-md shadow transition-all duration-300 hover:bg-[#e09664] hover:text-[#fddf97]"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-3 py-2 text[#364968] bg-white rounded-md shadow transition-all duration-300 hover:bg-[#6c4343]  hover:text-white"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
