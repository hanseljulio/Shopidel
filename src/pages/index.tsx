import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CarouselHome from "@/components/Carousel";
import { IAPIProductsResponse, IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface IProductProps {
  products: IAPIProductsResponse[];
}

export default function Home() {
  const [productList, setProductList] = useState<
    IAPIResponse<IAPIProductsResponse[]>
  >({});

  const getProduct = async () => {
    try {
      const res = await API.get(`/products?limit=18`);

      const data = res.data as IAPIResponse<IAPIProductsResponse[]>;

      console.log("Received data:", data);
      console.log("log lagi", data.data);

      setProductList(data!);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(productList, "jajajja");

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
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
          {productList.data?.map((product) => (
            <ProductCard
              key={product.district}
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
