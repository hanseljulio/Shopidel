import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc"

interface ILogin {
    email: string
    password: string
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<ILogin>()

    const loginHandler: SubmitHandler<ILogin> = (data) => {
        console.log(data)
    }

    return (
        <div className=' h-screen flex justify-between items-center'>
            <div className='max-w-7xl w-full mx-auto flex justify-around items-center'>
                <div className='hidden md:flex'>
                    <Image src={"/images/auth_hero.png"} width={400} height={400} alt='auth_hero' />
                </div>
                <div className=''>

                    <form className='w-96 px-5 py-10 rounded-md flex flex-col gap-y-5' onSubmit={handleSubmit(loginHandler)}>
                        <h1 className='text-xl font-bold'>Login</h1>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-sm'>Username</label>
                            <input {...register("email", { required: "Email is required" })} type="email" name="email" id="email" className='rounded-md border p-2' />
                            {errors.email && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='text-sm'>Password</label>
                            <input {...register("password", { required: "Password is required" })} type="password" name="password" id="password" className='rounded-md border p-2' />
                            {errors.password && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.password.message}</p>}
                        </div>
                        <div>
                            <Button text='Login' styling='p-2 bg-[#364968] w-full rounded-md text-white' onClick={() => console.log("login")} />
                            <p className='text-xs text-end hover:cursor-pointer mt-1 '>Forget password</p>
                        </div>
                    </form>
                    <div className='flex flex-col justify-center items-center px-5'>
                        <div className='flex w-full justify-center items-center'>
                            <div className='h-[0.5px] bg-slate-500 w-full'></div>
                            <p className='text-center text-sm text-slate-500 w-full'>Or login with</p>
                            <div className='h-[0.5px] bg-slate-500 w-full'></div>
                        </div>
                        <div className='bg-white shadow-md rounded-md p-3 w-fit border mt-2 hover:cursor-pointer'>
                            <div className='flex justify-center items-center gap-x-2'>
                                <FcGoogle size={20} />
                                <p className='text-sm'>Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login