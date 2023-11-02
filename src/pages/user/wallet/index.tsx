import Button from '@/components/Button'
import ProfileLayout from '@/components/ProfileLayout'
import Image from 'next/image'
import React, { useState } from 'react'

const Wallet = () => {

    return (
        <>
            <dialog open className='h-screen w-screen bg-black/50 flex justify-center items-center'>
                <div className='bg-white p-5 rounded-md flex flex-col items-center'>
                    <Image src={"/images/activate_wallet_pin.png"} width={150} height={150} alt='activate_wallet_pin' />
                    <h1 className='mt-5'>Input 6 digit PIN</h1>
                    <div className='mt-3'>
                        <OtpCode />
                    </div>
                    <Button text='Confirm PIN' styling='py-2 px-5 bg-[#364968] rounded-md text-white self-stretch mt-5' />
                </div>
            </dialog>
            <ProfileLayout>
                <ActivateWallet />
            </ProfileLayout>
        </>
    )
}


const ActivateWallet = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col items-center'>
                <Image src={"/images/no_wallet.png"} width={250} height={250} alt='no_wallet' />
                <p >You don&apos;t have wallet</p>
                <Button text='Activate Wallet' styling='py-2 px-5 bg-[#364968] w-full rounded-md text-white mt-2' />
            </div>
        </div>
    )
}

const WalletDetail = () => {
    return (
        <div className='p-5'>
            <div className='flex justify-between items-end'>
                <div>
                    <p className='text-slate-500 text-sm'>Wallet id: 73e2c4a4a41eff924744dde1fd12850a</p>
                    <p>Balance</p>
                    <p className='text-4xl font-bold'>Rp 1.000.000,00</p>
                </div>
                <div className='flex gap-x-2'>
                    <Button text='Top up' styling='p-2 bg-[#364968] w-full rounded-md text-white text-sm' />
                    <Button text='Change PIN' styling='p-2 bg-[#364968] w-full rounded-md text-white text-sm' />
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

const OtpCode = () => {
    const [otp, setOtp] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
    });

    return (
        <div className='flex gap-x-2'>
            <input type="text" name="input1" id="input1" className='w-10 rounded-md' value={otp.otp1} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp1: e.target.value })
            }} />
            <input type="text" name="input2" id="input2" className='w-10 rounded-md' value={otp.otp2} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp2: e.target.value })
            }} />
            <input type="text" name="input3" id="input3" className='w-10 rounded-md' value={otp.otp3} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp3: e.target.value })
            }} />
            <input type="text" name="input4" id="input4" className='w-10 rounded-md' value={otp.otp4} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp4: e.target.value })
            }} />
            <input type="text" name="input4" id="input4" className='w-10 rounded-md' value={otp.otp5} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp5: e.target.value })
            }} />
            <input type="text" name="input4" id="input4" className='w-10 rounded-md' value={otp.otp6} maxLength={1} onChange={(e) => {
                if (!/[0-9]/g.test(e.target.value) && e.target.value !== "") return e.preventDefault()
                setOtp({ ...otp, otp6: e.target.value })
            }} />
        </div>
    )
}


export default Wallet