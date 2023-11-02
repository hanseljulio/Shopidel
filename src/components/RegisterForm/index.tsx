import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../Button'
import { useRouter } from 'next/router'
import { IRegisterForm } from '@/interfaces/auth_interface'


const RegisterForm = () => {
  const router = useRouter()
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IRegisterForm>({
    mode: "onBlur"
  })
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    let registerData: Omit<IRegisterForm, "confirmPassword"> = {
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      username: data.username
    }
    console.log(registerData)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=' w-96 px-5 py-10 rounded-md flex flex-col gap-y-5'>
        <h1 className='text-xl font-bold'>Register</h1>
        <div className='flex flex-col'>
          <label htmlFor="username" className='text-sm'>Fullname</label>
          <input {...register("fullname", { required: "Fullname is required" })} type="text" name="fullname" id="fullname" className='rounded-md border p-2' />
          {errors.fullname?.type === "required" && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.fullname.message}</p>}
        </div>
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
        <div className='flex flex-col'>
          <label htmlFor="confirmPassword" className='text-sm'>Confirm Password</label>
          <input {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: {
              matchPassword: (v) => v === getValues("password") || "Password not match"
            }
          })} type="password" name="confirmPassword" id="confirmPassword" className='rounded-md border p-2' />
          {errors.confirmPassword?.type === errors.confirmPassword?.types?.required && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.confirmPassword?.message}</p>}
          {errors.confirmPassword?.types === errors.confirmPassword?.types?.validate && <p role='alert' className='text-xs text-red-500 mt-1'>{errors.confirmPassword?.message}</p>}
        </div>
        <Button text='Submit' styling='p-2 bg-[#364968] w-full rounded-md text-white' />
      </form>
      <p className='text-sm text-center'>Have an account? <span className='font-bold hover:cursor-pointer' onClick={() => router.push("/login")}>Login here</span></p>
    </>
  )
}

export default RegisterForm