import Button from '@/components/Button'
import ProfileLayout from '@/components/ProfileLayout'
import Image from 'next/image'
import React, { useState } from 'react'
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
    onOpenDialog: () => void
}

interface IActivateWalletModalProps {
    onClose: () => void
}

interface IWalletDetailProps {
    wallet: IAPIWalletResponse
}

const Wallet = ({ wallet }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isDialog, setIsDialog] = useState<boolean>(false)

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
                isDialog && <Modal content={<ActivateWalletModal onClose={() => setIsDialog(false)} />} />
            }
            <ProfileLayout>
                {
                    wallet!.isActive ? <WalletDetail wallet={wallet!} /> : <ActivateWallet onOpenDialog={() => setIsDialog(true)} />
                }
            </ProfileLayout>
        </>
    )
}

const ActivateWalletModal = ({ onClose }: IActivateWalletModalProps) => {
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
            <Image src={"/images/activate_wallet_pin.png"} width={150} height={150} alt='activate_wallet_pin' />
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
                <Image src={"/images/no_wallet.png"} width={250} height={250} alt='no_wallet' />
                <p >You don&apos;t have wallet</p>
                <Button text='Activate Wallet' styling='py-2 px-5 bg-[#364968] w-fit rounded-md text-white mt-2' onClick={onOpenDialog} />
            </div>
        </div>
    )
}

const WalletDetail = ({ wallet }: IWalletDetailProps) => {
    return (
        <div className='p-5'>
            <div className='flex justify-between items-end'>
                <div>
                    <p className='text-slate-500 text-sm'>Wallet id: {wallet.wallet_number}</p>
                    <p>Balance</p>
                    <p className='text-4xl font-bold'>{currencyConverter(parseInt(wallet.balance))}</p>
                </div>
                <div className='flex gap-x-2  w-48'>
                    <Button text='Top up' styling='p-2 bg-[#364968] w-full h-fit rounded-md text-white text-sm' />
                    <Button text='Change PIN' styling='p-2 bg-[#364968] w-full h-fit  rounded-md text-white text-sm' />
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