import React, { useEffect, useState } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "@/network";
import { IAPIPagination, IAPIResponse } from "@/interfaces/api_interface";
import { IProduct } from "@/interfaces/product_interface";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Pagination from "@/components/Pagination";

const SellerAdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IAPIPagination>();
  const router = useRouter();

  const getSellerProducts = async () => {
    try {
      const res = await API.get("/sellers/products", {
        params: {
          ...router.query,
        },
      });
      const data = res.data as IAPIResponse<IProduct[]>;

      setProducts(data.data!);
      setPagination(data.pagination!);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          return router.push("/");
        }
      }
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <SellerAdminLayout currentPage="Products">
      <div className="p-5 flex flex-col">
        <div className="flex flex-col md:flex-row  md:items-center md:justify-between">
          <h1 className="text-[30px]">My Products</h1>
          <div className="mt-2">
            <Button
              text="Add new product"
              onClick={() => router.push("/myshop/products/add-product")}
              styling="bg-[#364968] text-white p-2 rounded-md text-sm px-3"
            />
          </div>
        </div>
        {products.length !== 0 ? (
          <div className="flex flex-col">
            <div className="mt-5 h-[500px]">
              <table className="w-full hidden md:inline-table border-collapse border">
                <thead>
                  <tr>
                    <th className="text-start p-2 border-b">No</th>
                    <th className="text-start p-2 border-b">Name</th>
                    <th className="text-start p-2 border-b">Created At</th>
                    <th className="text-start p-2 border-b">Updated At</th>
                    <th className="text-start p-2 border-b">Action</th>
                  </tr>
                </thead>
                <thead>
                  {products.map((product, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${(i + 1) % 2 == 0 && "bg-slate-100"}`}
                      >
                        <td className="p-2">
                          {pagination?.current_page! * pagination?.limit! -
                            pagination?.limit! +
                            i +
                            1}
                        </td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">
                          {new Date(product.created_at).toLocaleString()}
                        </td>
                        <td className="p-2">
                          {new Date(product.updated_at).toLocaleString()}
                        </td>
                        <td className="p-2">
                          <div className="flex justify-around w-full h-full">
                            <AiFillEdit className="hover:cursor-pointer" />
                            <AiFillDelete
                              color={"red"}
                              className="hover:cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </thead>
              </table>
              <div className="border">
                {products.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className={`${
                        (i + 1) % 2 == 0 && "bg-slate-100"
                      } flex items-start gap-x-2 p-2`}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="rounded"
                      />
                      <div>
                        <h1 className="text-sm">{product.name}</h1>

                        <div>
                          <p className="text-xs mt-5">
                            Created at:{" "}
                            {new Date(product.created_at).toLocaleString()}
                          </p>
                          <p className="text-xs">
                            Updated at:{" "}
                            {new Date(product.updated_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="self-end">
              <Pagination
                data={pagination}
                onNavigate={(page) =>
                  router.push({
                    href: router.asPath,
                    query: {
                      page: page,
                    },
                  })
                }
              />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div
              className="flex flex-col h-full
             items-center gap-y-5"
            >
              <img className="w-80" src="/images/create-product.png" />
              <h1 className="text-2xl font-bold">Create your first product!</h1>
            </div>
          </div>
        )}
      </div>
    </SellerAdminLayout>
  );
};

export default SellerAdminProducts;
