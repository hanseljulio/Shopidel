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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/Modal";
import { useUserStore } from "@/store/userStore";

const SellerAdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IAPIPagination>();
  const [selectedProduct, setSelectedProduct] = useState<number[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { user } = useUserStore();

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

  const deleteProduct = async () => {
    for (let product of selectedProduct) {
      try {
        await API.delete(`/sellers/products/${product}`);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e);
          return toast.error("Error delete product");
        }
      }
    }
  };

  useEffect(() => {
    if (user !== undefined && !user.is_seller) {
      router.push("/myshop");
    }
  }, [user]);

  useEffect(() => {
    getSellerProducts();
  }, [router.query.page]);

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal
          content={
            <DeleteProductModal
              selectedProduct={selectedProduct}
              onDelete={async () => {
                try {
                  await toast.promise(
                    deleteProduct,
                    {
                      pending: "Loading",
                      success: "Delete success",
                      error: "An error occured",
                    },
                    {
                      autoClose: 1500,
                    }
                  );
                  await getSellerProducts();
                  return setIsModal(false);
                } catch (e) {
                  console.log(e);
                }
              }}
              onCancel={() => setIsModal(false)}
            />
          }
          onClose={() => setIsModal(false)}
        />
      )}
      <SellerAdminLayout currentPage="Products">
        <div className="p-5 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-[30px]">My Products</h1>
            <div className="flex gap-x-2 mt-2 md:mt-0">
              {selectedProduct.length > 1 && (
                <Button
                  text="Delete"
                  onClick={() => setIsModal(true)}
                  styling="bg-[#364968] text-white p-2 rounded-md text-sm px-3"
                />
              )}
              <Button
                text="Add new product"
                onClick={() => router.push("/myshop/products/add-product")}
                styling="bg-[#364968] text-white p-2 rounded-md text-sm px-3"
              />
            </div>
          </div>
          {products.length !== 0 ? (
            <div className="flex flex-col">
              <div className="mt-5 ">
                <table className="w-full hidden md:inline-table border-collapse border">
                  <thead>
                    <tr>
                      <th className="text-start p-2 border-b w-2"></th>
                      <th className="text-start p-2 border-b w-10">No</th>
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
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={
                                selectedProduct.includes(product.id)
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  return setSelectedProduct([
                                    ...selectedProduct,
                                    product.id,
                                  ]);
                                }
                                return setSelectedProduct(
                                  selectedProduct.filter(
                                    (id) => id !== product.id
                                  )
                                );
                              }}
                              className="rounded"
                            />
                          </td>
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
                              <div>
                                <AiFillEdit className="hover:cursor-pointer" />
                              </div>
                              <div
                                onClick={() => {
                                  setSelectedProduct([product.id]);
                                  setIsModal(true);
                                }}
                              >
                                <AiFillDelete
                                  color={"red"}
                                  className="hover:cursor-pointer"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </thead>
                </table>
                <div className="flex flex-col border md:hidden">
                  {products.map((product, i) => {
                    return (
                      <div
                        key={i}
                        className={`p-2 flex gap-x-3 items-center  ${
                          (i + 1) % 2 === 0 && "bg-slate-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={
                            selectedProduct.includes(product.id) ? true : false
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              return setSelectedProduct([
                                ...selectedProduct,
                                product.id,
                              ]);
                            }
                            return setSelectedProduct(
                              selectedProduct.filter((id) => id !== product.id)
                            );
                          }}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h1 className="truncate text-ellipsis w-60">
                            {product.name}
                          </h1>
                          <div className="mt-2">
                            <p className="text-sm">
                              Created at:{" "}
                              {new Date(product.created_at).toLocaleString()}
                            </p>
                            <p className="text-sm">
                              Updated at:{" "}
                              {new Date(product.updated_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-x-2">
                          <div>
                            <AiFillEdit className="hover:cursor-pointer" />
                          </div>
                          <div
                            onClick={() => {
                              setSelectedProduct([product.id]);
                              setIsModal(true);
                            }}
                          >
                            <AiFillDelete
                              color={"red"}
                              className="hover:cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="self-center mt-5">
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
                <h1 className="text-2xl font-bold">
                  Create your first product!
                </h1>
              </div>
            </div>
          )}
        </div>
      </SellerAdminLayout>
    </>
  );
};

interface IDeleteProductModalProps {
  onCancel: () => void;
  onDelete: () => void;
  selectedProduct: number[];
}

const DeleteProductModal = ({
  onCancel,
  onDelete,
  selectedProduct,
}: IDeleteProductModalProps) => {
  return (
    <div className="pt-5 flex flex-col">
      <div>
        <h1 className="text-xl">Delete Product</h1>
        <p className="text-gray-500 text-md">
          {selectedProduct.length > 1
            ? "Are you sure you want to delete the selected product"
            : "Are you sure you want to delete this product"}
        </p>
      </div>
      <div className="flex gap-x-2 self-end mt-5">
        <Button
          text="Cancel"
          styling="py-2 px-5 rounded-md border text-sm hover:bg-slate-100 transition-all"
          onClick={onCancel}
        />
        <Button
          text="Delete"
          styling="py-2 px-5 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition-all"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default SellerAdminProducts;
