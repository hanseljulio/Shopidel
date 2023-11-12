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

  const [paginationNumber, setPaginationNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);

  const getProduct = async () => {
    try {
      const res = await API.get(
        `/products?page=${page}&sortBy=price&sort=asc&limit=18`
      );

      const data = res.data as IAPIResponse<IAPIProductsResponse[]>;
      console.log("Received data:", data);
      setProductList(data);

      if (data.pagination?.total_page! <= 5) {
        setPaginationNumber(
          Array.from(Array(data.pagination?.total_page).keys())
        );
      } else if (paginationNumber.length === 0) {
        setPaginationNumber(Array.from(Array(5).keys()));
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    getProduct();
  }, [page]);

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
              key={product.ID}
              image={product.PictureURL}
              price={product.Price}
              showStar={false}
              title={product.Name}
              place={product.District}
              order={product.TotalSold}
            />
          ))}
        </div>
      </div>
      <div className="text-center my-10 justify-center flex">
        <div className="flex self-end mt-2">
          {productList?.pagination?.current_page !== 1 && (
            <button
              onClick={() => {
                setPage((prevPage) => prevPage - 1);
              }}
              className="px-2 py-1 border text-sm rounded-bl-md rounded-tl-md"
            >
              Prev
            </button>
          )}
          {paginationNumber.map((i) => (
            <Button
              key={i}
              text={(i + 1).toString()}
              styling={`px-3 py-1 border ${
                productList?.pagination?.current_page === i + 1 &&
                "bg-slate-200 "
              }`}
              onClick={() => setPage(i + 1)}
            />
          ))}
          {productList?.pagination?.current_page !==
            productList?.pagination?.total_page && (
            <button
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
              }}
              className="px-2 py-1 border text-sm rounded-br-md rounded-tr-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
