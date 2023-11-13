import Button from "@/components/Button";
import ProfileLayout from "@/components/ProfileLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "@/network";
import {
  IAPIPagination,
  IAPIResponse,
  IAPIWalletResponse,
} from "@/interfaces/api_interface";
import Modal from "@/components/Modal";
import PinCode from "@/components/PinCode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
  checkAuthSSR,
  clientUnauthorizeHandler,
  currencyConverter,
  setAuthCookie,
} from "@/utils/utils";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { IWalletTransaction } from "@/interfaces/wallet_interface";
import { useUserStore } from "@/store/userStore";
import Pagination from "@/components/Pagination";

interface IActivateWalletProps {
  onOpenDialog: (content: JSX.Element) => void;
}

interface IWalletDetailProps {
  wallet: IAPIWalletResponse;
  onOpenDialog: (content: JSX.Element) => void;
  onCloseDialog: () => void;
}

const Wallet = ({
  wallet,
  auth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>();

  if (wallet === undefined) {
    <ProfileLayout>
      <div className="flex justify-center items-center h-screen">
        <h1>An error occurred...</h1>
      </div>
    </ProfileLayout>;
  }

  useEffect(() => {
    if (auth !== undefined || auth !== null) {
      setAuthCookie(auth!);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {isModal && (
        <Modal content={modalContent!} onClose={() => setIsModal(false)} />
      )}
      <ProfileLayout>
        {wallet!.isActive ? (
          <WalletDetail
            onOpenDialog={(data) => {
              setIsModal(true);
              setModalContent(data);
            }}
            onCloseDialog={() => setIsModal(false)}
            wallet={wallet!}
          />
        ) : (
          <ActivateWallet
            onOpenDialog={(data) => {
              setIsModal(true);
              setModalContent(data);
            }}
          />
        )}
      </ProfileLayout>
    </>
  );
};

interface ITopupWalletProps {
  onBalanceChange: (amount: number) => void;
}

const TopupWalletModal = ({ onBalanceChange }: ITopupWalletProps) => {
  const [amount, setAmount] = useState<string>("");
  const router = useRouter();
  const { updateUser } = useUserStore();

  const topupHandler = () => {
    try {
      toast.promise(
        API.post("/accounts/wallets/topup", {
          amount: amount,
        }),
        {
          pending: "Loading",
          success: {
            render({ data }) {
              const res = data?.data as IAPIResponse;
              onBalanceChange(parseInt(amount));
              return res.message;
            },
          },
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return (data.response?.data as IAPIResponse).message;
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
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl">Topup</h1>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          topupHandler();
        }}
        className="flex flex-col mt-5"
      >
        <input
          onChange={(e) => {
            if (!/^[0-9]*$/g.test(e.target.value)) return e.preventDefault();
            setAmount(e.target.value);
          }}
          value={amount}
          type="text"
          name="amount"
          id="amount"
          placeholder="Amount..."
          className="rounded-md"
        />
        <div className="text-xs mt-2 text-slate-500">
          <p>min {currencyConverter(50000)}</p>
          <p>max {currencyConverter(10000000)}</p>
        </div>
        <Button
          text="Submit"
          styling="py-2 px-5 bg-[#364968] w-full rounded-md text-white mt-2"
        />
      </form>
    </>
  );
};

const ChangePinModal = () => {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const passwordValidation = () => {
    try {
      toast.promise(
        API.post("/accounts/check-password", {
          password: "123",
        }),
        {
          pending: "Loading",
          success: {
            render() {
              setIsValid(true);
              return "Validation success";
            },
          },
          error: {
            render({ data }) {
              console.log(data);
              return "Invalid password";
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
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

  const updatePinHandler = (pin: string) => {
    toast.onChange((data) => {
      if (data.type === "success" && data.status === "removed") {
        router.reload();
      }
    });

    try {
      toast.promise(
        API.put("/accounts/wallets/change-pin", {
          wallet_new_pin: pin,
        }),
        {
          pending: "Loading",
          success: {
            render({ data }) {
              console.log(data);
              return (data?.data as IAPIResponse).message;
            },
          },
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                return (data.response?.data as IAPIResponse).message;
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
        if (e.response?.status === 401) {
          return clientUnauthorizeHandler(router, updateUser);
        }
        return toast.error(e.message, {
          autoClose: 1500,
        });
      }
    }
  };

  return (
    <>
      <div>
        {isValid ? (
          <div className="flex flex-col justify-center items-center">
            <img src="/images/activate_wallet_pin.png" className="w-36" />
            <p>Input your new PIN</p>
            <div className="mt-3">
              <PinCode onSubmit={(pin) => updatePinHandler(pin)} />
            </div>
          </div>
        ) : (
          <div>
            <h1>Input your password</h1>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                passwordValidation();
              }}
              className="flex flex-col"
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="rounded-md mt-1"
              />
              <Button
                text="Submit"
                styling="py-2 px-5 bg-[#364968] w-full rounded-md text-white mt-2"
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const ActivateWalletModal = () => {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");

  const activateWalletHandler = () => {
    try {
      toast.promise(
        API.post("/accounts/wallets/activate", {
          wallet_pin: pin,
        }),
        {
          pending: "Loading",
          error: {
            render({ data }) {
              if (axios.isAxiosError(data)) {
                console.log(data);
                return (data.response?.data as IAPIResponse).message;
              }
            },
          },
          success: {
            render({ data }) {
              return (data?.data as IAPIResponse).message;
            },
          },
        },
        {
          autoClose: 1500,
        }
      );
      toast.onChange((data) => {
        if (data.type === "success" || data.type === "error") {
          router.reload();
        }
      });
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

  return (
    <div className="bg-white p-5 rounded-md flex flex-col items-center">
      <img
        src={"/images/activate_wallet_pin.png"}
        width={150}
        height={150}
        alt="activate_wallet_pin"
      />
      <h1 className="mt-5 font-bold">
        {isConfirm ? "Confirm your pin" : "Create your pin"}
      </h1>
      <div className="mt-3">
        {isConfirm ? (
          <PinCode
            onSubmit={(confirmPin) => {
              if (pin !== confirmPin) {
                toast.error("Pin not match", {
                  autoClose: 1500,
                });
                return setIsConfirm(false);
              }
              return activateWalletHandler();
            }}
          />
        ) : (
          <PinCode
            onSubmit={(pin) => {
              setPin(pin);
              setIsConfirm(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ActivateWallet = ({ onOpenDialog }: IActivateWalletProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <img
          src={"/images/no_wallet.png"}
          width={250}
          height={250}
          alt="no_wallet"
        />
        <p>You don&apos;t have wallet</p>
        <Button
          text="Activate Wallet"
          styling="py-2 px-5 bg-[#364968] w-fit rounded-md text-white mt-2"
          onClick={() => onOpenDialog(<ActivateWalletModal />)}
        />
      </div>
    </div>
  );
};

const WalletDetail = ({
  wallet,
  onOpenDialog,
  onCloseDialog,
}: IWalletDetailProps) => {
  const router = useRouter();
  const { updateUser } = useUserStore();
  const [data, setData] = useState<IAPIWalletResponse>(wallet);
  const [transactionHistoryRes, setTransactionHistoryRes] =
    useState<IAPIResponse<IWalletTransaction[]>>();
  const [page, setPage] = useState<number>(1);

  const getWalletTransactionHistory = async () => {
    try {
      const res = await toast.promise(
        API.get("/accounts/wallets/histories", {
          params: {
            page: page,
          },
        }),
        {
          error: "Error fetching data",
        }
      );

      const data = res.data as IAPIResponse<IWalletTransaction[]>;
      setTransactionHistoryRes(data);
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
    getWalletTransactionHistory();
  }, [data, page]);

  return (
    <div className="p-5">
      <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row justify-between md:items-end">
        <div>
          <p className="text-slate-500 text-sm">
            Wallet id: {data.wallet_number}
          </p>
          <p>Balance</p>
          <p className="text-4xl font-bold">
            {currencyConverter(parseInt(data.balance))}
          </p>
        </div>
        <div className="flex gap-x-2 w-52">
          <Button
            onClick={() =>
              onOpenDialog(
                <TopupWalletModal
                  onBalanceChange={(amount) => {
                    const newBalance = parseInt(data.balance) + amount;
                    setData({ ...data, balance: newBalance.toString() });
                    return onCloseDialog();
                  }}
                />
              )
            }
            text="Top up"
            styling="p-2 bg-[#364968] w-full h-fit rounded-md text-white text-sm"
          />
          <Button
            onClick={() => onOpenDialog(<ChangePinModal />)}
            text="Change PIN"
            styling="p-2 bg-[#364968] w-full h-fit rounded-md text-white text-sm"
          />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl">Transaction history</h1>
        {transactionHistoryRes?.data?.length === 0 ? (
          <p>You dont have any transactions</p>
        ) : (
          <div className="flex flex-col h-[620px] md:h-[550px]">
            <div className="flex-1">
              <table className="w-full mt-2 border hidden md:inline-table">
                <thead>
                  <tr className="border-2">
                    <th className="p-2 text-start">No</th>
                    <th className="p-2 text-start">Title</th>
                    <th className="p-2 text-start">From/To</th>
                    <th className="p-2 text-start">Date</th>
                    <th className="p-2 text-start">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistoryRes?.data?.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className={`border-2 ${
                          (i + 1) % 2 === 0 && "bg-slate-100"
                        }`}
                      >
                        <td className="p-2">
                          {transactionHistoryRes.pagination?.current_page! *
                            transactionHistoryRes.pagination?.limit! -
                            transactionHistoryRes.pagination?.limit! +
                            i +
                            1}
                        </td>
                        <td className="p-2">{item.type}</td>
                        <td className="p-2">
                          {item.from !== "" ? item.from : item.to}
                        </td>
                        <td className="p-2">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                        <td
                          className={`p-2 font-bold ${
                            item.amount.includes("-")
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {currencyConverter(parseInt(item.amount))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-col mt-2 md:hidden border-2">
                {transactionHistoryRes?.data?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex items-center  ${
                        (i + 1) % 2 === 0 && "bg-slate-100"
                      } px-2 py-2`}
                    >
                      <div className="w-[12%]">
                        <p>
                          {transactionHistoryRes.pagination?.current_page! *
                            transactionHistoryRes.pagination?.limit! -
                            transactionHistoryRes.pagination?.limit! +
                            i +
                            1}
                        </p>
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <p>{item.type}</p>
                          <p
                            className={`font-bold ${
                              item.amount.includes("-")
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {currencyConverter(parseInt(item.amount))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <p>
                            {item.from !== ""
                              ? `From: ${item.from}`
                              : `To: ${item.to}`}
                          </p>
                          <p>{new Date(item.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex self-end mt-2">
              {transactionHistoryRes && (
                <Pagination
                  data={transactionHistoryRes?.pagination}
                  onNavigate={(navPage) => setPage(navPage)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let data: IAPIWalletResponse | undefined;
  let auth = await checkAuthSSR(context);

  if (auth === null) {
    context.res.writeHead(301, { location: "/login" });
    context.res.end();
  }

  try {
    const res = await API.get("/accounts/wallets", {
      headers: {
        Authorization: `Bearer ${auth?.access_token}`,
      },
    });
    data = (res.data as IAPIResponse<IAPIWalletResponse>).data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
    }
  }

  return {
    props: {
      wallet: data,
      auth: auth,
    },
  };
};
