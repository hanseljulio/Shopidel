import useRegisterStore, { IUser } from '@/store/userStore'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'


export interface IRegisterForm {
  onNext?: () => void
  onSubmit?: (data: IUser) => void
}

const RegisterUserFirst = ({ onNext }: IRegisterForm) => {
  const { updateRegisterData } = useRegisterStore()
  const { register, handleSubmit, getValues, setError, clearErrors, formState: { errors, isValid } } = useForm<IUser>({
    mode: "onBlur"
  })
  const onSubmit: SubmitHandler<IUser> = (data) => {
    updateRegisterData(data)
    onNext!()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=' w-96 px-5 py-10 rounded-md flex flex-col gap-y-5'>
        <div className='flex flex-col'>
          <label htmlFor="username" className='text-sm'>Username</label>
          <input {...register("username", { required: "Username is required" })} type="text" name="username" id="username" className='rounded-md border p-2' />
          {errors.username?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.username.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-sm'>Email Address</label>
          <input {...register("email", { required: "Email is required" })} type="email" name="email" id="email" className='rounded-md border p-2' />
          {errors.email?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password" className='text-sm'>Password</label>
          <input {...register("password", {

            required: "Password is required",
            validate: {
              notIncludeUsername: (v) => !v.includes(getValues("username")) || "Password cannot contain username"
            }
          })} type="password" name="password" id="password" className='rounded-md border p-2' />
          {errors.password?.type === errors.password?.types?.required && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.password?.message}</p>}
          {errors.password?.types === errors.password?.types?.validate && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.password?.message}</p>}
        </div>
        <button type="submit" className='p-2 bg-[#364968] w-full rounded-md text-white' >Submit</button>
      </form>
      <p className='text-sm text-center'>Have an account? <span className='font-bold hover:cursor-pointer'>Login here</span></p>
    </>
  )
}

export default RegisterUserFirst