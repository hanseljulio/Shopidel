import React, { useState, useEffect } from "react";
import SellerAdminLayout from "@/components/SellerAdminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { API } from "@/network";
import axios from "axios";
import { clientUnauthorizeHandler } from "@/utils/utils";
import { useUserStore } from "@/store/userStore";
import Modal from "@/components/Modal";
import { IAPIResponse } from "@/interfaces/api_interface";
import { SubmitHandler, useForm } from "react-hook-form";
import Head from "next/head";

interface IShowcase {
  data: IShowcaseData[];
  pagination: {
    total_page: number;
    total_item: number;
    current_page: number;
    limit: 10;
  };
}

interface IShowcaseData {
  id: number;
  name: string;
}

interface ICreateShowcaseData {
  name: string;
}

interface ISellerProductSelect {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  isChecked: boolean;
}

interface IDeleteShowcaseModal {
  closeFunction: () => void;
  submitFunction: () => void;
}

interface ISellerProductSelect {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  isChecked: boolean;
}

interface IShowcaseDetail {
  id: number;
  name: string;
  selected_products: IShowcaseSelectedProducts[];
  created_at: "2023-11-22T21:23:12.742497Z";
}

interface IShowcaseSelectedProducts {
  product_id: number;
  product_name: string;
  created_at: string;
}

const DeleteShowcaseModal = (props: IDeleteShowcaseModal) => {
  return (
    <div className="bg-white p-5 rounded-md  md:w-[500px] h-[180px] w-[99%]">
      <div className="pb-3 text-center">
        <h1 className="text-[20px] ml-1">
          Are you sure you want to delete this promotion?
        </h1>
        <h1>This can&apos;t be undone!</h1>
      </div>

      <div className="flex justify-center mt-3 gap-6">
        <Button
          text="Yes"
          onClick={props.submitFunction}
          styling="bg-red-600 p-3 rounded-[8px] w-[100px] text-white my-4"
        />
        <Button
          text="No"
          onClick={props.closeFunction}
          styling="bg-[#364968] p-3 rounded-[8px] w-[100px] text-white my-4"
        />
      </div>
    </div>
  );
};

interface IEditPromoProps {
  promoId: number;
  exitFunction: () => void;
}

const EditPromo = (props: IEditPromoProps) => {
  const [sellerProducts, setSellerProducts] = useState<ISellerProductSelect[]>([
    {
      id: 0,
      name: "",
      category_id: 936,
      created_at: "2023-11-21T05:36:43.520268Z",
      updated_at: "2023-11-21T05:36:43.520268Z",
      deleted_at: "0001-01-01T00:00:00Z",
      isChecked: false,
    },
  ]);

  const handleCheckAll = (e: any) => {
    const { checked } = e.target;
    const currentData = [...sellerProducts];

    const updatedData = currentData.map((data) => {
      return { ...data, isChecked: checked };
    });

    setSellerProducts(updatedData);
  };

  const handleCheck = (e: any, id: number) => {
    const { checked } = e.target;
    const currentData = [...sellerProducts];

    const updatedData = currentData.map((data) => {
      if (data.id === id) {
        return { ...data, isChecked: checked };
      } else {
        return data;
      }
    });
    setSellerProducts(updatedData);
  };

  const router = useRouter();
  const { updateUser } = useUserStore();

  const [showcaseData, setShowcaseData] = useState<IShowcaseDetail>();

  const getSellerProducts = async () => {
    try {
      const response = await API.get(`sellers/products`);
      const selectedProducts = showcaseData?.selected_products.map(
        (data: any) => data.product_id
      );

      response.data.data.map((data: any) => {
        if (selectedProducts?.includes(data.id)) {
          data.isChecked = true;
        } else {
          data.isChecked = false;
        }
      });

      setSellerProducts(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ICreateShowcaseData>({
    mode: "onBlur",
  });

  const getPromoData = async () => {
    try {
      const response = await API.get(`/showcases/${props.promoId}`);
      setShowcaseData(response.data.data);

      const currentData = {
        name: response.data.data.name,
      };

      reset({ ...currentData });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getPromoData();
    getSellerProducts();
  }, [sellerProducts.length]);

  const submit: SubmitHandler<ICreateShowcaseData> = async (data) => {
    const selectedProducts = [];

    for (let i = 0; i < sellerProducts.length; i++) {
      if (sellerProducts[i].isChecked) {
        selectedProducts.push(sellerProducts[i].id);
      }
    }

    if (selectedProducts.length === 0) {
      toast.error("Please select items that will have the promotion.");
    }

    const sendData = {
      name: data.name,
      selected_products_id: selectedProducts,
    };

    try {
      toast.promise(
        API.put(`/showcases/${props.promoId}`, sendData),
        {
          pending: "Updating showcase...",
          success: {
            render() {
              props.exitFunction();
              return "Showcase successfully updated!";
            },
          },
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return `${(data.response?.data as IAPIResponse).message}`;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-md md:w-[1000px] md:h-[800px] h-[80vh] w-[90vw] overflow-y-auto">
      <div className="py-3 border-b-2">
        <h1 className="text-[20px] font-bold">Edit Promotion</h1>
      </div>
      <div className="pt-6">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col ">
            <label htmlFor="name" className="text-sm">
              Showcase name
            </label>
            <input
              {...register("name", {
                required: "Showcase name is required",
              })}
              type="text"
              name="name"
              id="name"
              className="rounded-md border p-2"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="">
            <div className="flex justify-between items-center md:flex-row flex-col">
              <h1 className="text-[25px] py-6">Select Products</h1>
              <div className="flex items-center gap-6 md:pb-0 pb-6">
                <input
                  type="checkbox"
                  className="hover:cursor-pointer"
                  onClick={handleCheckAll}
                  name="allselect"
                />
                <p>Select all</p>
              </div>
            </div>
            <div className="bg-slate-300 h-[400px] overflow-y-scroll flex flex-col items-center">
              {sellerProducts.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border-2 rounded-md  p-6 flex gap-6 items-center my-3 w-[95%]"
                  >
                    <input
                      onClick={(e) => handleCheck(e, product.id)}
                      type="checkbox"
                      className="hover:cursor-pointer"
                      checked={product.isChecked}
                    />
                    <h1>{product.name}</h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-14">
            <Button
              text="Edit showcase"
              styling="p-3 bg-[#364968] w-[300px] rounded-md text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const SellerShowcasePage = () => {
  const [showcaseData, setShowcaseData] = useState<IShowcase>();
  const [selectedShowcaseId, setSelectedShowcaseId] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const { updateUser } = useUserStore();

  const getShowcaseData = async () => {
    try {
      const response = await API.get(`/showcases`);
      setShowcaseData(response.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  useEffect(() => {
    getShowcaseData();
  }, []);

  const deleteShowcase = async () => {
    try {
      toast.promise(
        API.delete(`/showcases/${selectedShowcaseId}`),
        {
          pending: "Deleting showcase...",
          success: {
            render() {
              getShowcaseData();
              return "Showcase successfully deleted!";
            },
          },
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return `${(data.response?.data as IAPIResponse).message}`;
              }
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <>
      {showEditModal && (
        <Modal
          content={
            <EditPromo
              promoId={selectedShowcaseId}
              exitFunction={() => {
                setShowEditModal(false);
                getShowcaseData();
              }}
            />
          }
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <Modal
          content={
            <DeleteShowcaseModal
              submitFunction={() => {
                deleteShowcase();
                setShowDeleteModal(false);
              }}
              closeFunction={() => setShowDeleteModal(false)}
            />
          }
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      <SellerAdminLayout currentPage="Showcase">
        <Head>
          <title>Showcase</title>
        </Head>
        <ToastContainer />
        <div className="w-full mx-auto mt-6">
          <div className="flex items-center justify-between md:flex-row md:mx-[5%] flex-col p-0 md:gap-0 gap-8">
            <h1 className="text-[30px]">Showcase</h1>
            <Button
              text="Create new showcase"
              onClick={() => router.push("/myshop/showcase/create")}
              styling="bg-[#fddf97] p-3 rounded-[8px] w-[200px] my-4"
            />
          </div>
          <div className="mx-[5%] ">
            {!showcaseData || showcaseData.data.length === 0 ? (
              <h1 className="font-bold text-[25px] text-center pt-4">
                You have no showcases at the moment.
              </h1>
            ) : (
              <div className="flex flex-col gap-6 pt-4">
                {showcaseData?.data.map((data, index) => {
                  return (
                    <div key={index} className="border-2 border-black p-6">
                      <div className="flex justify-between items-center md:flex-row flex-col">
                        <div>
                          <h1 className="text-[25px]">{data.name}</h1>
                          <br />
                        </div>
                        <div className="md:text-right flex flex-col md:gap-3 md:items-end gap-6 text-center md:pt-0 pt-10">
                          <div className="flex justify-end gap-2 ">
                            <h1
                              onClick={() => {
                                setSelectedShowcaseId(data.id);
                                setShowEditModal(true);
                              }}
                              className="text-blue-600 hover:cursor-pointer hover:underline"
                            >
                              Edit
                            </h1>
                            <h1>|</h1>

                            <h1
                              onClick={() => {
                                setSelectedShowcaseId(data.id);
                                setShowDeleteModal(true);
                              }}
                              className="text-blue-600 hover:cursor-pointer hover:underline"
                            >
                              Delete
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-center py-10">
                  <Pagination
                    data={showcaseData.pagination}
                    onNavigate={(navPage) => setPage(navPage)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SellerAdminLayout>
    </>
  );
};

export default SellerShowcasePage;
