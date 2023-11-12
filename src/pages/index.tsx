import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Category from "@/components/Category";
import CarouselHome from "@/components/Carousel";
import { GetServerSidePropsContext } from "next";
import { IAPIProductsResponse, IAPIResponse } from "@/interfaces/api_interface";
import { API } from "@/network";
import axios from "axios";

interface IProductProps {
  products: IAPIProductsResponse[]; // Correct the prop name to match what's returned from getServerSideProps
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIProductsResponse[] | undefined;

  try {
    const res = await API.get(`/products`);
    data = (res.data as IAPIResponse<IAPIProductsResponse[]>).data;
    console.log(data, "dataa");
    console.log("masu");
    console.log("heheh");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
      console.log("errrorrrrr");
    }
  }

  return {
    props: {
      products: data,
    },
  };
};

export default function Home({ products }: IProductProps) {
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
        {/* category */}
        <div>
          <p className="text-lg md:text-xl mt-14 mb-3 py-2 font-semibold text-center text-[#29374e]">
            Recommendation
          </p>
        </div>
        <div className="justify-between gap-x-4 gap-y-4 grid grid-cols-2 md:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.ID}
              image={product.PictureURL || ""}
              price={product.Price || ""}
              showStar={false}
              title={product.Name || ""}
              place={product.District || ""}
              order={product.TotalSold || 0}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
