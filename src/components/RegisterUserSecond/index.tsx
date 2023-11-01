import useRegisterStore, { IUser } from '@/store/userStore'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterForm } from '../RegisterUserFirst'
import Button from '../Button'

const RegisterUserSecond = ({ onSubmit }: IRegisterForm) => {
    const { registerData } = useRegisterStore()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUser>({ mode: "onBlur" })

    const formSubmitHandler: SubmitHandler<IUser> = (data) => {
        data.shopName = ""
        data.profilePhoto = ""

        onSubmit!({ ...registerData, ...data })
    }
    return (
        <form onSubmit={handleSubmit(formSubmitHandler)} className=' w-96 px-5 py-10 rounded-md flex flex-col gap-y-5'>
            <div className='flex flex-col'>
                <label htmlFor="fullname" className='text-sm'>Full name</label>
                <input {...register("fullname", { required: "Full name is required" })} type="text" name="fullname" id="fullname" className='rounded-md border p-2' />
                {errors.fullname?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.fullname.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="gender" className='text-sm'>Gender</label>
                <select id="gender" {...register("gender")} className='rounded-md border p-2 bg-white'>
                    <option value="male">Male</option>
                    <option value="male">Female</option>
                </select>
                {errors.gender?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.gender.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="phone" className='text-sm'>Phone number</label>
                <input {...register("phone", {
                    required: "Phone number is required"
                })} onKeyDown={(e) => {
                    !/[0-9]/g.test(e.key) && e.key !== "Backspace" && e.preventDefault()
                }} type='text' name="phone" id="phone" className='rounded-md border p-2' />
                {errors.phone?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.phone.message}</p>}
            </div>
            <div className='flex flex-col'>
                <label htmlFor="birthdate" className='text-sm'>Birthdate</label>
                <input onChange={(e) => setValue("birthdate", new Date(e.target.value).toISOString())} type="date" name="birthdate" id="birthdate" className='rounded-md border p-2' required />
                {errors.birthdate?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.birthdate.message}</p>}
            </div>
            <Button text='Submit' styling='p-2 bg-[#364968] w-full rounded-md text-white' />
        </form>
    )
}

export default RegisterUserSecond