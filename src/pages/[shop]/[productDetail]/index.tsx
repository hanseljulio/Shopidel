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
import {
  IProductSuggestion,
  IReviewProduct,
} from "@/interfaces/product_interface";
import { IAPIProfileShopResponse } from "@/interfaces/seller_interface";
import { API } from "@/network";
import { IWishlist } from "@/interfaces/product_interface";
import { useUserStore } from "@/store/userStore";
import {
  clientUnauthorizeHandler,
  currencyConverter,
  getYoutubeVideoId,
} from "@/utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import {
  FaHeart,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { VscEmptyWindow } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";

interface IChoosedVariant {
  variant1: string;
  variant2?: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const shop = params?.shop;
  const productDetail = params?.productDetail;

  try {
    const response = await API.get(`/products/detail/${shop}/${productDetail}`);
    const product = (response.data as IAPIResponse<IAPIProductDetailResponse>)
      .data;

    const responseSeller = await API.get(`/sellers/${shop}/profile`);
    const seller = responseSeller.data.data;
    return {
      props: {
        product,
        seller,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);

    return {
      notFound: true,
    };
  }
};

const ProductDetail = ({
  product,
  seller,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const [count, setCount] = useState<number>(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isModalReview, setIsModalReview] = useState<boolean>(false);
  const [variation, setVariation] = useState<string>("");
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [varIndex, setVarIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(product?.is_favorite || false);
  const [imagesProduct, setImagesProduct] = useState([]);
  const [reviews, setReviews] = useState<IAPIResponse<IReviewProduct[]>>();
  const [page, setPage] = useState<number>(1);
  const [wishlist, setWishlist] = useState<IAPIResponse<IWishlist[]>>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const variationRef = useRef<HTMLDivElement>(null);
  const [imageReviewChosen, setImageReviewChosen] = useState("");

  const scrollLeft = () => {
    if (variationRef.current) {
      variationRef.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (variationRef.current) {
      variationRef.current.scrollLeft += 100;
    }
  };

  useEffect(() => {
    if (variationRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = variationRef.current;
      if (scrollLeft === 0) {
      } else {
      }
      if (scrollLeft + clientWidth === scrollWidth) {
      } else {
      }
    }
  }, [variationRef]);
  const handleSeeMore = () => {
    setIsExpanded(true);
  };

  const handleSeeLess = () => {
    setIsExpanded(false);
  };

  const [suggestion, setSuggestion] =
    useState<IAPIResponse<IProductSuggestion[]>>();
  const [shopProfile, setShopProfile] = useState<
    IAPIResponse<IAPIProfileShopResponse> | undefined
  >();

  const [choosedVariant, setChoosedVariant] = useState<
    IChoosedVariant | undefined
  >(
    product.variants[0].selections
      ? product.variant_options?.length === 1
        ? {
            variant1: product.variants[0]?.selections[0]?.selection_name,
          }
        : {
            variant1: product.variants[0]?.selections[0]?.selection_name,
            variant2: product.variants[0]?.selections[1]?.selection_name,
          }
      : undefined
  );

  const choosedVariantHandler = () => {
    const variant = product.variants.find((v: any) => {
      if (product.variant_options?.length === 1) {
        return v.selections[0]?.selection_name === choosedVariant?.variant1;
      } else if (product.variant_options?.length === 2) {
        return (
          v.selections[0]?.selection_name === choosedVariant?.variant1 &&
          v.selections[1]?.selection_name === choosedVariant?.variant2
        );
      }
    });

    const price = parseInt(variant ? variant.price : product.variants[0].price);
    if (count >= 1) {
      setSubtotal(price * count);
    } else {
      if (currentStock >= 1) {
        setSubtotal(price);
      } else {
        setSubtotal(0);
      }
    }
    setVarIndex(variant ? variant.variant_id : product.variants[0].variant_id);
    if (currentStock < 1) {
      setCurrentStock(variant ? variant.stock : product.variants[0].stock);
      setCount(0);
    } else {
      setCurrentStock(
        variant ? variant.stock - count : product.variants[0].stock - count
      );
    }
  };

  const isYouTubeVideo = (url: string) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtu\.be\/)(.+)$/;
    return youtubeRegex.test(url);
  };

  useEffect(() => {
    choosedVariantHandler();
  }, [choosedVariant, count]);

  useEffect(() => {
    setChoosedVariant(undefined);
  }, [product]);

  const renderContent = () => {
    if (isHovering) {
      return (
        <>
          <img
            width={200}
            height={200}
            src={variation}
            alt=""
            className="bigImage w-full cursor-pointer rounded-md"
            onClick={handleZoomImage}
          />
        </>
      );
    } else {
      return (
        <img
          width={100}
          height={100}
          src={variation}
          alt=""
          className="bigImage w-full cursor-pointer rounded-md"
          onClick={handleZoomImage}
        />
      );
    }
  };

  const renderBigImage = () => {
    if (isYouTubeVideo(variation)) {
      return (
        <div className="bigImage w-full cursor-pointer rounded-md">
          <YouTube
            videoId={getYoutubeVideoId(variation) ?? ""}
            opts={{ width: "100%", height: 315 }}
            onReady={(event) => event.target.pauseVideo()}
          />
        </div>
      );
    } else {
      return (
        <img
          src={variation}
          alt=""
          className="bigImage w-full cursor-pointer rounded-md"
          onClick={handleZoomImage}
        />
      );
    }
  };

  useEffect(() => {
    if (imagesProduct?.length > 0) {
      setVariation(imagesProduct[0]);
    }
  }, [imagesProduct]);

  useEffect(() => {
    if (product) {
      setImagesProduct(product.images);
    }
  }, [product]);

  const getImages = async () => {
    try {
      const res = await API.get(`/products/${product.id}/pictures`);
      const data = res.data.data;
      setImagesProduct(data);
      console.log("img", data);
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
        `products/${product.id}/reviews?page=${page}&comment=true&image=true&orderBy=newest`
      );

      const data = res.data as IAPIResponse<IReviewProduct[]>;
      setReviews(data);
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
          toastId: "errorSuggestion",
          autoClose: 1500,
        });
      }
    }
  };

  const getShop = async () => {
    try {
      const res = await API.get(`/sellers/${seller.shop_name_slug}/profile`);

      const data = res.data as IAPIResponse<IAPIProfileShopResponse>;
      setShopProfile(data);
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
    getSuggest();
    getShop();
  }, []);

  useEffect(() => {
    getImages();
  }, [product.id]);

  useEffect(() => {
    getReviewProducts();
  }, [product.id, page]);

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
  const handleZoomImageReview = (src: string) => {
    setIsModalReview(true);
    setImageReviewChosen(src);
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
    const data = {
      product_id: varIndex,
      quantity: count,
    };
    if (count >= 1 && currentStock >= 1) {
      try {
        const response = await API.post(`/accounts/carts`, data, {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });

        if (response.status === 200) {
          toast.success("Added to cart", { autoClose: 1500 });
          console.log("cart", response.data);
        } else {
          toast.error("Failed to add to cart", { autoClose: 1500 });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message, { autoClose: 1500 });
        } else {
          toast.error("An error occurred while adding to cart", {
            autoClose: 1500,
          });
        }
      }
    }
    if (currentStock < 1) {
      toast.error("Out of stock", {
        autoClose: 1500,
      });
    }
    if (count < 1) {
      toast.error("Add quantity first", {
        autoClose: 1500,
      });
    }
  };

  const getWishlist = async () => {
    try {
      const res = await API.get(`/products/favorites`);
      console.log(res);
      const data = res.data as IAPIResponse<IWishlist[]>;
      setWishlist(data);
      console.log(data.data);

      console.log("betul");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error("Error fetching wishlist", {
          toastId: "errorWishlist",
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

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
        setIsFavorite(!isFavorite);
      } else {
        toast.error("Failed to add to wishlist", { autoClose: 1500 });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, { autoClose: 1500 });
      } else {
        toast.error("An error occurred while adding to wishlist", {
          autoClose: 1500,
        });
      }
    }
  };

  const renderDescription = () => {
    const descriptionToShow = isExpanded
      ? product?.description
      : product?.description.slice(0, 250);

    return (
      <div>
        {descriptionToShow
          ?.split("\\n")
          .map((paragraph: string, index: number) => (
            <span key={index} className="line-break">
              {paragraph}
              <br />
            </span>
          ))}
        {!isExpanded && product?.description.length > 450 && (
          <p
            className="text-center text-[#f57b29] cursor-pointer"
            onClick={handleSeeMore}
          >
            &#812; See more
          </p>
        )}
        {isExpanded && (
          <p
            className="text-center text-[#f57b29] cursor-pointer"
            onClick={handleSeeLess}
          >
            &#813; See less
          </p>
        )}
      </div>
    );
  };

  if (product === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal
          content={<img className="h-[50vh]" src={variation} alt="..." />}
          onClose={() => setIsModal(false)}
        />
      )}
      {isModalReview && (
        <div>
          <Modal
            content={
              <img className="h-[50vh]" src={imageReviewChosen} alt="..." />
            }
            onClose={() => setIsModalReview(false)}
          />
          <p>{imageReviewChosen}nn</p>
        </div>
      )}
      <div>
        <Navbar />
        <div className="mx-auto lg:max-w-7xl px-4 md:px-0 ">
          <div className="flex-col  md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0">
            <div className="order-1 md:order-1 imageProduct w-full md:w-1/4 rounded-md overflow-hidden flex flex-col">
              {isYouTubeVideo(variation) ? renderBigImage() : renderContent()}

              <div className="relative ">
                <div
                  className="scroll-smooth   justify-between gap-1 mt-2 flex flex-row overflow-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300   [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track] [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  ref={variationRef}
                >
                  {imagesProduct?.map((url, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 cursor-pointer w-28 h-28 rounded-md mr-2 flex"
                      onClick={() => {
                        setVariation(url);
                        setIsHovering(false);
                      }}
                    >
                      {isYouTubeVideo(url) ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${getYoutubeVideoId(
                              url
                            )}/0.jpg`}
                            className="w-full h-full rounded-md"
                            alt="variation image"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            className="cursor-pointer w-full h-full rounded-md"
                            src={url}
                            alt="images"
                            onMouseOver={() => handleMouseOver(url)}
                            onMouseOut={handleMouseOut}
                            onClick={handleZoomImage}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-fit absolute top-0 flex justify-between items-center h-full">
                  <Button
                    styling=" bg-neutral-500 p-2 opacity-70 text-white font-extrabold hover:bg-neutral-300"
                    onClick={scrollLeft}
                    text="&#60;"
                  />
                </div>
                <div className="w-fit absolute top-0 right-0  flex justify-between items-center h-full ">
                  <Button
                    styling="bg-neutral-500  p-2 opacity-70 text-white font-extrabold hover:bg-neutral-300"
                    onClick={scrollRight}
                    text="&gt;"
                  />
                </div>
              </div>

              <div className="favorite-icon mt-5 text-right">
                <button onClick={() => handleWishlist(product)}>
                  {isFavorite &&
                  wishlist?.data?.map(
                    (e) => e.product_id === product.product_id
                  ) ? (
                    <div className="flex items-center gap-1">
                      <FaHeart style={{ color: "red" }} />
                      <p>
                        Favorite <span>{`(total user)`}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <FaRegHeart style={{ color: "red" }} />
                      <p>
                        Favorite <span>{`(total user)`}</span>
                      </p>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="order-2 md:order-3 md:w-1/4 pt-3">
              <div className="border shadow-inner rounded-sm p-5 h-fit pt-2 md:sticky md:top-0">
                <p className="productTitle text-base font-semibold pb-3">
                  Set Amounts
                </p>
                <p className="text-sm mb-5">
                  {choosedVariant?.variant1 !== undefined
                    ? ` ${choosedVariant?.variant1}`
                    : ""}
                  {choosedVariant?.variant2 !== undefined
                    ? ` - ${choosedVariant?.variant2}`
                    : ""}
                </p>

                <div className="flex justify-between md:gap-1 mb-2 text-sm text-neutral-600 py-3 ">
                  <p className="">Pengiriman</p>

                  <div className="flex items-center gap-1">
                    <FaLocationDot />
                    {shopProfile?.data?.seller_district}
                  </div>
                </div>

                <div className="flex text-center items-center mt-5">
                  <div className="quantity flex border border-zinc-600">
                    <Button styling="minus w-3 md:w-5" onClick={dec} text="-" />
                    <input
                      className="text-center w-16 md:w-20 border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      min={1}
                      max={currentStock}
                      readOnly={true}
                      type="number"
                      value={count}
                      onChange={(e: any) => {
                        setCount(parseInt(e.target.value)), e.preventDefault();
                        console.log("counter", count);
                      }}
                    />
                    <Button styling="plus w-3 md:w-5" onClick={inc} text="+" />
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
                <div className="btn flex gap-x-2 justify-between mt-10">
                  <div className="w-full">
                    {currentStock >= 1 ? (
                      <button
                        type="submit"
                        onClick={handleToCart}
                        className="flex items-center justify-center gap-1 h-10 border border-[#364968] hover:shadow-md bg-[#d6e4f8] p-2 w-full md:w-32 hover:bg-[#eff6fd]  transition-all duration-300"
                      >
                        <AiOutlineShoppingCart /> <span>Add to cart</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        type="submit"
                        onClick={handleToCart}
                        className="flex items-center justify-center gap-1 h-10  bg-[#d6e4f8] p-2 w-full md:w-32  transition-all duration-300"
                      >
                        <AiOutlineShoppingCart /> <span>Add to cart</span>
                      </button>
                    )}
                  </div>

                  {currentStock >= 1 ? (
                    <div onClick={handleToCart} className="w-full">
                      <Button
                        onClick={() => router.push(`/cart`)}
                        styling=" bg-[#364968] text-white p-2 w-full h-10 md:w-32 justify-center hover:bg-[#394e6f] hover:shadow-lg"
                        text="Buy now"
                      />
                    </div>
                  ) : (
                    <div onClick={handleToCart} className="w-full">
                      <Button
                        disabled
                        onClick={() => router.push(`/cart`)}
                        styling="bg-[#7b94bd] text-white p-2 w-full h-10 md:w-32 justify-center"
                        text="Buy now"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="order-3 md:order-2 description mt-10 md:mt-0 md:w-2/4">
              <div className="spesification">
                <p className="productTitle text-2xl md:text-3xl font-medium pb-3">
                  {product?.name}
                  {choosedVariant?.variant1 !== undefined
                    ? ` - ${choosedVariant?.variant1}`
                    : ""}
                  {choosedVariant?.variant2 !== undefined
                    ? ` - ${choosedVariant?.variant2}`
                    : ""}
                </p>
                <div className="historyProduct flex items-center text-xs pb-3">
                  <p className="pr-3">{`Sold ${product?.sold}`} </p>
                  <p className="px-3 border-l border-slate-600 flex-row flex md:flex gap-x-1 items-center justify-center ">
                    <BsStarFill style={{ color: "#f57b29" }} />
                    <span className="items-center">{product?.stars}</span>
                  </p>
                </div>
                <p className="productPrice text-2xl font-semibold text-[#f57b29] py-3">
                  {/* {currencyConverter(
                    parseInt(product?.variants?.[0]?.price ?? 0)
                  )} */}
                  {currencyConverter(subtotal)}
                </p>
              </div>
              <div className="flex flex-col gap-y-3 text-xs text-neutral-600 w-full mt-5">
                {product?.variant_options?.map((item: any, i: number) => {
                  return (
                    <div key={i} className="md:gap-x-20 items-start gap-10">
                      <p className="text-sm md:text-base text-neutral-700 font-medium">
                        {item.variant_option_name}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:justify-between w-full my-5 ">
                        {item.childs.map((variant: any, k: number) => {
                          return (
                            <p
                              key={k}
                              className={`px-1 py-1 justify-center items-center flex border text-center rounded-md cursor-pointer hover:bg-[#d6e4f8] hover:border hover:border-[#364968] row-span-2 w-full text-ellipsis line-clamp-2 h-10 
                              ${
                                i === 0
                                  ? choosedVariant?.variant1 === variant &&
                                    "bg-[#d6e4f8] border border-[#364968]"
                                  : choosedVariant?.variant2 === variant &&
                                    "bg-[#d6e4f8] border border-[#364968]"
                              }`}
                              onMouseEnter={
                                i === 0
                                  ? () => handleMouseOver(item.pictures[k])
                                  : undefined
                              }
                              onClick={() => {
                                setChoosedVariant(
                                  i === 0
                                    ? {
                                        ...choosedVariant!,
                                        variant1: variant,
                                      }
                                    : {
                                        ...choosedVariant!,
                                        variant2: variant,
                                      }
                                );
                              }}
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
              <div className="desc pt-5 ">
                <p className="text-lg font-medium border-b my-4">Description</p>
                <div>{renderDescription()}</div>
              </div>
            </div>
          </div>
          <div className="seller flex-col md:flex-row justify-between md:flex gap-10 py-5 px-5 md:px-0 ">
            <div className="order-1 w-full md:w-3/4">
              <div className="sellerShop rounded-md bg-[#364968] flex flex-col md:flex-row gap-y-5 text-white py-3 my-10 gap-10 px-5 ">
                <img
                  src={shopProfile?.data?.seller_picture_url}
                  alt="seller"
                  className="imgSeller w-full md:w-32 h-full place-self-center object-fill rounded-lg"
                  placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                  onError={(e) => {
                    (e.target as HTMLInputElement).src =
                      "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                  }}
                />
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-48 w-full">
                  <div className="aboutSeller w-full md:w-1/2">
                    <p className=" text-lg md:text-xl font-medium md:font-semibold text-center md:text-left">
                      {shopProfile?.data?.seller_name}
                    </p>
                    <p>
                      <button
                        onClick={() =>
                          router.push(`/${shopProfile?.data?.shop_name_slug}`)
                        }
                        className="flex gap-1 md:gap-2 mt-3 text-sm justify-center items-center w-full border border-[#fddf97] hover:shadow-lg   p-1 md:w-36 text-[#fddf97] hover:bg-[#1c2637]  transition-all duration-300"
                      >
                        <FaStore />
                        <p className=" text-sm md:text-base">Visit the store</p>
                      </button>
                    </p>
                  </div>
                  <table className="aboutSeller w-full  md:w-full text-sm md:text-base  self-center ">
                    <thead></thead>
                    <tbody>
                      <tr className="flex items-center justify-center gap">
                        <td className="w-full">Shipping from</td>
                        <td className="w-full flex items-center gap-x-1 font-medium">
                          <FaLocationDot />
                          {` ${shopProfile?.data?.seller_district}`}
                        </td>
                      </tr>
                      <tr className="flex mt-3">
                        <td className="w-full">Stars</td>
                        <td className="w-full flex gap-x-1 items-center font-medium">
                          <FaStar style={{ color: "#f57b29" }} />
                          {shopProfile?.data?.seller_stars}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="reviews">
                <div className="my-5 pt-8">
                  <p className="reviewsProduct text-xl font-semibold border-b pb-2">
                    Product Reviews
                  </p>
                </div>
                <div>
                  {reviews?.data?.map((review, index) => (
                    <div
                      key={index}
                      className="buyerReviews flex mt-5 py-2  border-b"
                    >
                      <div className="imageCust w-28 h-full pr-4 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full"
                          src={review.customer_picture_url}
                          alt="profile"
                          placeholder="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png"
                          onError={(e) => {
                            (e.target as HTMLInputElement).src =
                              "https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Account-512.png";
                          }}
                        />
                      </div>
                      <div className="bodyReview w-full flex-row gap-y-5">
                        <p className="pb-1 font-medium">
                          {review.customer_name}
                        </p>

                        <p className="flex pb-1">
                          {Array.from({
                            length: Math.min(parseInt(review.stars), 5),
                          }).map((_, index) => (
                            <FaStar
                              key={index}
                              style={{ color: "#f57b29" }}
                              size={13}
                            />
                          ))}
                          {Array.from({
                            length: Math.max(5 - parseInt(review.stars), 0),
                          }).map((_, index) => (
                            <FaRegStar
                              key={index}
                              style={{ color: "#f57b29" }}
                              size={13}
                            />
                          ))}
                        </p>
                        <p className="dateReview text-sm text-neutral-500 pb-3 items-center">
                          {review.created_at.split("T")[0]} |
                          <span> variation: {review.variant}</span>
                        </p>
                        <p className="theReview">{review.comment}</p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3 object-fill">
                          {review.pictures?.map((e, i) => (
                            <>
                              <img
                                key={i}
                                className={`cursor-pointer w-full h-full rounded-sm
                                `}
                                src={e}
                                alt="image review"
                                onClick={() => handleZoomImageReview(e)}
                              />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex self-end mt-2 justify-center">
                    {reviews?.data === null ? (
                      <>
                        <p className="text-center font-semibold text-neutral-500 text-lg justify-center">
                          <VscEmptyWindow
                            size={30}
                            style={{ margin: "0 auto" }}
                          />
                          There are no reviews yet
                        </p>
                      </>
                    ) : (
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
                        onClick={() =>
                          router.push(
                            `/${seller.shop_name_slug}/${e.product_name_slug}`
                          )
                        }
                        key={i}
                        image={e.product_picture_url}
                        title={e.product_name}
                        price={e.product_price}
                        showStar={false}
                      />
                    )
                )}
                <Button
                  text="View More"
                  styling="bg-[#f57b29] rounded-md p-3 shadow-lg text-white hover:bg-[#fc9b5b] col-span-2 md:col-span-1"
                  onClick={() => router.push(`/${seller.shop_name_slug}`)}
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
