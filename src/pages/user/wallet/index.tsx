import Button from '@/components/Button'
import ProfileLayout from '@/components/ProfileLayout'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '@/network'
import { IAPIResponse, IAPIWalletResponse } from '@/interfaces/api_interface'
import Modal from '@/components/Modal'
import PinCode from '@/components/PinCode'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { currencyConverter } from '@/utils/utils'
import { useRouter } from 'next/router'
import { getCookie } from "cookies-next"

interface IActivateWalletProps {
    onOpenDialog: (content: JSX.Element) => void
}

interface IWalletDetailProps {
    wallet: IAPIWalletResponse
    onOpenDialog: (content: JSX.Element) => void
    onCloseDialog: () => void
}

const Wallet = ({ wallet }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<JSX.Element>()

    if (wallet === undefined) {
        <ProfileLayout>
            <div className='flex justify-center items-center h-screen'>
                <h1>An error occurred...</h1>
            </div>
        </ProfileLayout>
    }


    return (
        <>
            <ToastContainer />
            {
                isModal && <Modal content={modalContent!} onClose={() => setIsModal(false)} />
            }
            <ProfileLayout>
                {
                    wallet!.isActive ? <WalletDetail onOpenDialog={(data) => {
                        setIsModal(true)
                        setModalContent(data)
                    }} onCloseDialog={() => setIsModal(false)} wallet={wallet!} />
                        : <ActivateWallet onOpenDialog={(data) => {
                            setIsModal(true)
                            setModalContent(data)
                        }} />
                }
            </ProfileLayout>
        </>
    )
}

interface ITopupWalletProps {
    onBalanceChange: (amount: number) => void
}

const TopupWalletModal = ({ onBalanceChange }: ITopupWalletProps) => {
    const [amount, setAmount] = useState<string>("")

    const topupHandler = () => {
        try {
            toast.promise(
                API.post("/accounts/wallets/topup", {
                    amount: amount
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookie("accessToken")}`
                    }
                }),
                {
                    pending: "Loading",
                    success: {
                        render({ data }) {
                            const res = (data?.data as IAPIResponse)
                            onBalanceChange(parseInt(amount))
                            return res.message
                        }
                    },
                    error: {
                        render({ data }) {
                            if (axios.isAxiosError(data)) {
                                return (data.response?.data as IAPIResponse).message
                            }
                        }
                    }
                },
                {
                    autoClose: 1500
                }
            )
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return toast.error(e.message, {
                    autoClose: 1500
                })
            }
        }
    }

    return (
        <>
            <h1 className='font-bold text-xl'>Topup</h1>
            <form action="#" onSubmit={(e) => {
                e.preventDefault()
                topupHandler()
            }} className='flex flex-col mt-5'>
                <input onChange={(e) => {
                    if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                    setAmount(e.target.value)
                }} value={amount} type="text" name="amount" id="amount" placeholder='Amount...' className='rounded-md' />
                <div className='text-xs mt-2 text-slate-500'>
                    <p>min {currencyConverter(50000)}</p>
                    <p>max {currencyConverter(10000000)}</p>
                </div>
                <Button text='Submit' styling='py-2 px-5 bg-[#364968] w-full rounded-md text-white mt-2' />
            </form>
        </>
    )
}

const ChangePinModal = () => {
    const router = useRouter()
    const [isValid, setIsValid] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const passwordValidation = () => {
        try {
            toast.promise(
                API.post("/accounts/check-password", {
                    password: "123"
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookie("accessToken")}`
                    }
                }),
                {
                    pending: "Loading",
                    success: {
                        render() {
                            setIsValid(true)
                            return "Validation success"
                        }
                    },
                    error: {
                        render({ data }) {
                            console.log(data)
                            return "Invalid password"
                        }
                    }
                },
                {
                    autoClose: 1500
                }
            )
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return toast.error(e.message, {
                    autoClose: 1500
                })
            }
        }
    }

    const updatePinHandler = (pin: string) => {
        toast.onChange(data => {
            if (data.type === "success" && data.status === "removed") {
                router.reload()
            }
        })

        try {
            toast.promise(
                API.put("/accounts/wallets/change-pin", {
                    wallet_new_pin: pin
                }, {
                    headers: {
                        Authorization: `Bearer ${getCookie("accessToken")}`
                    }
                }),
                {
                    pending: "Loading",
                    success: {
                        render({ data }) {
                            console.log(data)
                            return (data?.data as IAPIResponse).message
                        }
                    },
                    error: {
                        render({ data }) {
                            if (axios.isAxiosError(data)) {
                                return (data.response?.data as IAPIResponse).message
                            }
                        }
                    }
                },
                {
                    autoClose: 1500
                }
            )
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return toast.error(e.message, {
                    autoClose: 1500
                })
            }
        }
    }

    return (
        <>
            <div>
                {
                    isValid ? <div className='flex flex-col justify-center items-center'>
                        <img src='/images/activate_wallet_pin.png' className='w-36' />
                        <p>Input your new PIN</p>
                        <div className='mt-3'>
                            <PinCode onSubmit={(pin) => updatePinHandler(pin)} />
                        </div>
                    </div> : <div>
                        <h1>Input your password</h1>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault()
                            passwordValidation()
                        }} className='flex flex-col'>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className='rounded-md mt-1' />
                            <Button text='Submit' styling='py-2 px-5 bg-[#364968] w-full rounded-md text-white mt-2' />
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

const ActivateWalletModal = () => {
    const router = useRouter()

    const activateWalletHandler = (pin: string) => {
        try {
            toast.promise(
                API.post("/accounts/wallets/activate", {
                    wallet_pin: pin.toString()
                }, {
                    headers: {
                        "Authorization": `Bearer ${getCookie("accessToken")}`,
                    }
                }),
                {
                    pending: "Loading",
                    error: {
                        render({ data }) {
                            if (axios.isAxiosError(data)) {
                                console.log(data)
                                return (data.response?.data as IAPIResponse).message
                            }
                        }
                    },
                    success: {
                        render({ data }) {
                            return (data?.data as IAPIResponse).message
                        }
                    }
                },
                {
                    autoClose: 1500
                }
            )
            toast.onChange(data => {
                if (data.type === "success" || data.type === "error") {
                    router.reload()
                }
            })
        } catch (e) {
            if (axios.isAxiosError(e)) {
                toast.error(e.message, {
                    autoClose: 1500
                })
            }
        }
    }

    return (
        <div className='bg-white p-5 rounded-md flex flex-col items-center'>
            <img src={"/images/activate_wallet_pin.png"} width={150} height={150} alt='activate_wallet_pin' />
            <h1 className='mt-5 font-bold'>Create 6 digit PIN</h1>
            <div className='mt-3'>
                <PinCode onSubmit={(pin) => activateWalletHandler(pin)} />
            </div>
        </div>
    )
}

const ActivateWallet = ({ onOpenDialog }: IActivateWalletProps) => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col items-center'>
                <img src={"/images/no_wallet.png"} width={250} height={250} alt='no_wallet' />
                <p >You don&apos;t have wallet</p>
                <Button text='Activate Wallet' styling='py-2 px-5 bg-[#364968] w-fit rounded-md text-white mt-2' onClick={() => onOpenDialog(<ActivateWalletModal />)} />
            </div>
        </div>
    )
}


const WalletDetail = ({ wallet, onOpenDialog }: IWalletDetailProps) => {
    const [data, setData] = useState<IAPIWalletResponse>(wallet)
    return (
        <div className='p-5'>
            <div className='flex justify-between items-end'>
                <div>
                    <p className='text-slate-500 text-sm'>Wallet id: {data.wallet_number}</p>
                    <p>Balance</p>
                    <p className='text-4xl font-bold'>{currencyConverter(parseInt(data.balance))}</p>
                </div>
                <div className='flex gap-x-2  w-48'>
                    <Button onClick={() => onOpenDialog(<TopupWalletModal onBalanceChange={(amount) => {
                        const newBalance = parseInt(data.balance) + amount
                        return setData({ ...data, balance: newBalance.toString() })
                    }} />)} text='Top up' styling='p-2 bg-[#364968] w-full h-fit rounded-md text-white text-sm' />
                    <Button onClick={() => onOpenDialog(<ChangePinModal />)} text='Change PIN' styling='p-2 bg-[#364968] w-full h-fit  rounded-md text-white text-sm' />
                </div>
            </div>
            <div className='mt-5'>
                <h1 className='text-2xl'>Transaction history</h1>
                <table className='w-full mt-2'>
                    <thead>
                        <tr>
                            <th className='text-start'>No</th>
                            <th className='text-start'>Title</th>
                            <th className='text-start'>From/To</th>
                            <th className='text-start'>Date</th>
                            <th className='text-start'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Wallet


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    let data: IAPIWalletResponse | undefined

    let accessToken = context.req.cookies['accessToken']

    try {
        const res = await API.get("/accounts/wallets", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        data = (res.data as IAPIResponse<IAPIWalletResponse>).data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data)
        }
    }

    return {
        props: {
            wallet: data
        }
    }
}