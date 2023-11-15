import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CarouselHome from "@/components/Carousel";
import { IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { useEffect, useState } from "react";
import Category from "@/components/Category";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { IProduct } from "@/interfaces/product_interface";

export default function Home() {
  const router = useRouter();
  const [productList, setProductList] = useState<IAPIResponse<IProduct[]>>({});

  const getProduct = async () => {
    try {
      const res = await API.get(
        `/products?page=1&sortBy=price&sort=asc&limit=18`
      );

      const data = res.data as IAPIResponse<IProduct[]>;

      setProductList(data!);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <CarouselHome />
      <div className="mx-auto lg:max-w-7xl md:items-center px-4 md:px-0 mb-5">
        <div>
          <p className="text-lg md:text-xl mt-10 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Category
          </p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-9 gap-x-4 gap-y-4">
          <Category
            src="baju_bayi.png"
            text="Fashion Baby"
            alt="Fashion Baby"
          />
          <Category src="elektronik.png" alt="Electronic" text="Electronic" />
          <Category
            src="fashion.png"
            alt="Fashion and Accessories"
            text="Fashion and Accessories"
          />
          <Category
            src="food.png"
            text="Foods and Drinks"
            alt="Foods and Drinks"
          />
          <Category
            src="handphone.png"
            text="Handphone and Accessories"
            alt="Handphone and Accessories"
          />
          <Category src="jam.png" text="Watch" alt="Watch" />
          <Category
            src="laptop.png"
            alt="Computer and Accessories"
            text="Computer and Accessories"
          />
          <Category src="tas_wanita.png" alt="Woman's Bag" text="Woman's Bag" />
          <Category src="make_up.png" alt="Beauty" text="Beauty" />
          <Category src="obat.png" alt="Medicine" text="Medicine" />
          <Category
            src="pakaian_laki.png"
            alt="Men's Fashion"
            text="Men's Fashion"
          />
          <Category
            src="pakaian_wanita.png"
            alt="Woman's Fashion"
            text="Woman's Fashion"
          />
          <Category
            src="rumah_tangga.png"
            alt="Home Appliance"
            text="Home Appliance"
          />
          <Category
            src="sepatu_laki.png"
            alt="Men's Shoes"
            text="Men's Shoes"
          />
          <Category
            src="sepatu_wanita.png"
            alt="Woman's Shoes"
            text="Woman's Shoes"
          />
          <Category
            src="souvenir_party.png"
            alt="Souvenir Party"
            text="Souvenir Party"
          />
          <Category src="sports.png" alt="Sports" text="Sports" />
          <Category src="tas.png" alt="Men's Bag" text="Men's Bag" />
        </div>
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
          {productList.data?.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() =>
                router.push(`/${product.shop_name}/${product.name}`)
              }
              image={product.picture_url}
              price={product.price}
              showStar={false}
              title={product.name}
              place={product.district}
              order={product.total_sold}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
