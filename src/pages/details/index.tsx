import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import {
  IAPIProductDetailResponse,
  IAPIResponse,
} from "@/interfaces/api_interface";
import { IReviewProduct } from "@/interfaces/review_interface";
import { IProductSuggestion } from "@/interfaces/suggestProduct_interface";
import { API } from "@/network";
import { currencyConverter } from "@/utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaStar, FaStore } from "react-icons/fa";
import { FaLocationDot, FaTruckFast } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IAPIProductDetailResponseWithSeller
  extends IAPIProductDetailResponse {
  seller_name: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIProductDetailResponseWithSeller | undefined;

  try {
    const res = await API.get("/products/4");
    data = (res.data as IAPIResponse<IAPIProductDetailResponseWithSeller>).data;
    console.log("hasil product", data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e.response?.data);
    }
    data = {
      id: 0,
      name: "",
      description: "",
      stars: "",
      sold: 0,
      available: 0,
      images: null,
      seller_name: "",
      variant_options: [
        {
          variant_option_name: "",
          childs: [],
        },
      ],
      variants: [
        {
          variant_id: 0,
          variant_name: "",
          selections: [
            {
              selection_variant_name: "",
              selection_name: "",
            },
          ],
          stock: 0,
          price: "",
        },
      ],
      is_favorite: false,
    };
  }

  return {
    props: {
      product: data!,
    },
  };
};

const ProductDetail = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [count, setCount] = useState<number>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>("");
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [subtotal, setSubtotal] = useState<number>(0);
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imagesProduct, setImagesProduct] = useState([]);
  const [reviews, setReviews] = useState<IAPIResponse<IReviewProduct[]>>();
  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [suggestion, setSuggestion] =
    useState<IAPIResponse<IProductSuggestion[]>>();
  const [shop, setShop] =
    useState<IAPIResponse<IAPIProductDetailResponseWithSeller[]>>();

  useEffect(() => {
    if (imagesProduct.length > 0) {
      setVariation(imagesProduct[0]);
    }
  }, [imagesProduct]);

  const getImages = async () => {
    try {
      const res = await API.get(`/products/${product.id}/pictures`);
      const data = res.data.data;
      setImagesProduct(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const getReviewProducts = async () => {
    try {
      const res = await API.get(
        `products/${product.id}/reviews?page=1&stars=5&comment=true&image=true&orderBy=newest`
      );
      const data = res.data as IAPIResponse<IReviewProduct[]>;
      setReviews(data);

      if (data.pagination?.total_page! <= 5) {
        return setPaginationNumber(
          Array.from(Array(data.pagination?.total_page).keys())
        );
      }

      if (paginationNumber.length === 0) {
        return setPaginationNumber(Array.from(Array(5).keys()));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error("Error fetching review products", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  const getSuggest = async () => {
    try {
      const res = await API.get(`/products/${product.id}/recommended-products`);

      const data = res.data as IAPIResponse<IProductSuggestion[]>;
      setSuggestion(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error("Error fetching product suggestion", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  const getShop = async () => {
    try {
      const res = await API.get(
        `/products/${product.seller_name}/recommended-products`
      );

      const data = res.data as IAPIResponse<
        IAPIProductDetailResponseWithSeller[]
      >;
      setShop(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error("Error fetching product suggestion", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getImages();
    getSuggest();
    getShop();
  }, []);

  useEffect(() => {
    getReviewProducts();
  }, []);

  const calculateSubtotal = () => {
    const selectedVariant = product?.variants.find((variant) => {
      return Object.keys(selectedVariants).every((optionName) => {
        return variant.selections.some((selection) => {
          return (
            selection.selection_variant_name === optionName &&
            selection.selection_name === selectedVariants[optionName]
          );
        });
      });
    });

    if (selectedVariant) {
      const price = parseInt(selectedVariant.price);
      setSubtotal(price * count);
      setCurrentStock(selectedVariant.stock);
    }
  };

  useEffect(() => {
    calculateSubtotal();
  }, [selectedVariants, count]);

  const handleClick = (variant: string, optionName: string) => {
    setSelectedVariants({
      ...selectedVariants,
      [optionName]: variant,
    });
  };

  const handleMouseOver = (src: string) => {
    setIsHovering(true);
    setVariation(src);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleZoomImage = () => {
    setIsModal(true);
  };

  const inc = () => {
    if (count >= 0 && count <= currentStock - 1) {
      setCount(count + 1);
    }
  };

  const dec = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleToCart = async () => {
    if (count < 1) {
      return;
    }

    let variant;
    if (Object.keys(selectedVariants).length === 0) {
      variant = product?.variants[0];
    } else {
      variant = product?.variants.find((v) => {
        const variantKey = v.selections[0].selection_variant_name;
        return selectedVariants[variantKey] === v.selections[0].selection_name;
      });
    }

    if (!variant) {
      return;
    }

    const data = {
      product_id: variant.variant_id,
      quantity: count,
    };

    try {
      const response = await API.post(`/accounts/carts`, data, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Added to cart", { autoClose: 1500 });
      } else {
        toast.error("Failed to add to cart", { autoClose: 1500 });
      }
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to cart", {
          autoClose: 1500,
        });
      }
    }
  };

  const handleWishlist: SubmitHandler<IAPIProductDetailResponse> = async (
    data
  ) => {
    let favData: Pick<IAPIProductDetailResponse, "id"> = {
      id: data.id,
    };

    try {
      const response = await API.post(
        `/products/${data.id}/favorites/add-favorite`,
        favData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Added to wishlist", { autoClose: 1500 });
        setIsFavorite(true);
      } else {
        toast.error("Failed to add to wishlist", { autoClose: 1500 });
      }
      console.log("yes");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to wishlist", {
          autoClose: 1500,
        });
      }
      console.log("no");
    }
  };

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      {isModal && (
        <div className="z-50 fixed">
          <Modal
            content={<img width={800} height={800} src={variation} alt="..." />}
            onClose={() => setIsModal(false)}
          />
        </div>
      )}
      <div>
        <Navbar />
        <div className="mx-auto lg:max-w-7xl px-4 md:px-0">
          <div className="flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1 md:order-1 imageProduct w-full md:w-1/4 rounded-md overflow-hidden">
              {isHovering == true ? (
                <img
                  width={200}
                  height={200}
                  src={variation}
                  alt=""
                  className="bigImage w-full cursor-pointer rounded-md"
                  onClick={handleZoomImage}
                />
              ) : (
                <img
                  width={100}
                  height={100}
                  src={variation}
                  alt=""
                  className="bigImage w-full cursor-pointer rounded-md"
                  onClick={handleZoomImage}
                />
              )}
              <div className="variation justify-center gap-1 mt-2 flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {imagesProduct.map((url, index) => {
                  return (
                    <img
                      key={index}
                      className="cursor-pointer w-[90px] h-full rounded-md"
                      width={50}
                      height={50}
                      src={url}
                      alt="images"
                      onMouseOver={() => handleMouseOver(url)}
                      onMouseOut={handleMouseOut}
                      onClick={handleZoomImage}
                    />
                  );
                })}
              </div>
              <div className="favorite-icon mt-5 text-right">
                <button onClick={() => handleWishlist(product)}>
                  {isFavorite || product.is_favorite ? (
                    <div className="flex items-center gap-1">
                      <FaHeart style={{ color: "red" }} />
                      <p>Favorite</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FaRegHeart style={{ color: "red" }} />
                      <p>Favorite</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="order-2 md:order-3 purchaseBox border shadow-inner rounded-sm p-5 h-fit md:w-1/4 md:sticky md:top-0">
              <p className="productTitle text-md font-medium pb-3">
                Set Amounts
              </p>

              <div className="flex gap-2 md:gap-1 mb-2 text-sm text-neutral-600 py-3 justify-between">
                <p className="">Pengiriman</p>
                <div>
                  <div className="flex items-center gap-1">
                    <FaLocationDot /> {"Malang"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTruckFast /> {`Jakarta Selatan ${"Rp3000"}`}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 text-xs text-neutral-600">
                {product?.variant_options?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex md:gap-x-20 items-start gap-10"
                    >
                      <p>{item.variant_option_name}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {item.childs.map((variant, k) => {
                          const optionName = item.variant_option_name;
                          return (
                            <p
                              key={k}
                              className={`px-2 py-1 border text-center rounded-md cursor-pointer ${
                                selectedVariants[optionName] === variant
                                  ? "bg-[#d6e4f8] border border-[#364968]"
                                  : ""
                              }`}
                              onClick={() => handleClick(variant, optionName)}
                            >
                              {variant}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex text-center items-center mt-5">
                <div className="quantity flex border border-zinc-600">
                  <button className="minus w-5" onClick={dec}>
                    -
                  </button>
                  <input
                    className="text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    min={1}
                    max={100}
                    type="number"
                    value={count}
                    onChange={(e: any) => {
                      setCount(parseInt(e.target.value)), e.preventDefault();
                    }}
                  />
                  <button className="plus w-5" onClick={inc}>
                    +
                  </button>
                </div>
                <div className="stock text-xs text-neutral-500 py-3 pl-5 ">
                  <p>{`Stock ${currentStock}`}</p>
                </div>
              </div>
              <div className="flex text-sm text-neutral-600 py-3 justify-between">
                <p className="">Subtotal</p>
                <p className="subTotal text-lg font-semibold text-neutral-800">
                  {currencyConverter(subtotal)}
                </p>
              </div>
              <div className="btn flex gap-5 mt-10">
                <button
                  type="submit"
                  onClick={handleToCart}
                  className="flex items-center justify-center gap-1 border border-[#364968] hover:shadow-md bg-[#d6e4f8] p-2 w-36 hover:bg-[#eff6fd]  transition-all duration-300"
                >
                  <AiOutlineShoppingCart /> <span>Add to cart</span>
                </button>
                <button
                  type="submit"
                  className=" bg-[#364968] text-white p-2 w-36 justify-center hover:bg-[#394e6f] hover:shadow-lg"
                >
                  Buy now
                </button>
              </div>
            </div>

            <div className="order-3 md:order-2 description mt-10 md:mt-0 md:w-2/4">
              <div className="spesification">
                <p className="productTitle text-2xl font-medium pb-3">
                  {product?.name}
                </p>
                <div className="historyProduct flex items-center text-xs pb-3">
                  <p className="pr-3">{`Sold ${product?.sold}`} </p>
                  <p className="px-3 border-l border-slate-600 flex-row  md:flex flex gap-1 items-center justify-center ">
                    <BsStarFill style={{ color: "#f57b29" }} />
                    <span className="items-center">5</span>
                  </p>
                </div>
                <p className="productPrice text-2xl font-semibold text-[#f57b29] py-3">
                  {currencyConverter(parseInt(product?.variants[0].price))}
                </p>
              </div>
              <div className="desc pt-5 ">
                <p className="text-lg font-medium border-b my-4">Description</p>
                <p className="">
                  {product?.description
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <span key={index} className="line-break">
                        {paragraph.split("\n").map((line, lineIndex) => (
                          <React.Fragment key={lineIndex}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </span>
                    ))}
                </p>
              </div>
            </div>
          </div>
          <div className="seller flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1 w-full  md:w-3/4">
              <div className="sellerShop bg-[#364968] flex flex-row gap-y-5 text-white py-3 my-10 gap-10 px-5 ">
                <img
                  width={90}
                  height={0}
                  src={"/images/defaultuser.png"}
                  alt="seller"
                  className="imgSeller w-20 h-full place-self-center"
                />
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-48">
                  <div className="aboutSeller justify-between w-full md:w-1/2 ">
                    <p>Nama Toko</p>
                    <p>
                      <button className="flex gap-1 md:gap-2 mt-3 text-sm justify-center items-center w-full border border-[#fddf97] hover:shadow-lg   p-1 md:w-36 text-[#fddf97] hover:bg-[#1c2637]  transition-all duration-300">
                        <FaStore /> <p>Visit the store</p>
                      </button>
                    </p>
                  </div>

                  <div className="aboutSeller justify-between w-1/2 md:w-full">
                    <p className="flex gap-5 md:gap-12">
                      Rating
                      <span className="flex items-center ">
                        <FaStar /> 4.8
                      </span>
                    </p>
                    <p className="flex gap-5 md:gap-14 mt-3">
                      Product <span>30</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="reviews">
                <div className="">
                  <p className="reviewsProduct text-lg font-semibold">
                    Product Reviews
                  </p>
                  <div>
                    <p>{"4.8 dari 5"}</p>
                    <div className="star flex text-[#fc9b5b]">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div>
                  {reviews?.data?.map((review, index) => (
                    <div
                      key={index}
                      className="buyerReviews flex mt-5 py-2  border-y"
                    >
                      <div className="imageCust pr-4 rounded-full overflow-hidden">
                        <img
                          width={100}
                          height={100}
                          src={review.customer_picture_url}
                          alt="profile"
                          placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                          onError={(e) => {
                            (e.target as HTMLInputElement).src =
                              "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                          }}
                        />
                      </div>
                      <div className="bodyReview flex-row gap-y-5">
                        <p className="custName">{review.customer_name}</p>

                        <p className="flex">
                          {Array.from({ length: parseInt(review.stars) }).map(
                            (_, index) => (
                              <FaStar
                                key={index}
                                style={{ color: "#f57b29" }}
                                size={13}
                              />
                            )
                          )}
                        </p>
                        <p className="dateReview text-sm text-neutral-500 pb-3 items-center">
                          {review.created_at.split("T")[0]} |
                          <span> variation: {review.variant}</span>
                        </p>
                        <p className="theReview">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex self-end mt-2 justify-center">
                    {reviews && (
                      <Pagination
                        data={reviews?.pagination}
                        onNavigate={(navPage: any) => setPage(navPage)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2 w-full md:w-1/4 items-center flex flex-col  md:justify-end mt-5">
              <p className="py-3 font-medium text-lg">Others in our shop</p>
              <div className="md:w-3/4 content-center grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2 justify-between">
                {suggestion?.data?.map(
                  (e, i) =>
                    i < 6 && (
                      <ProductCard
                        key={i}
                        image={e.product_picture_url}
                        title={e.product_name}
                        price={e.product_price}
                        showStar={false}
                        districtSold={false}
                      />
                    )
                )}
                <Button
                  text="View More"
                  styling="bg-[#f57b29] rounded-md p-3 shadow-lg text-white hover:bg-[#fc9b5b] col-span-2 md:col-span-1"
                  onClick={() => router.push(`/`)}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
