import Image from 'next/image'
import React from 'react'
import RegisterForm from '../../components/RegisterForm'


const Register = () => {
    return (
        <div className=' h-screen flex justify-between items-center'>
            <div className='max-w-7xl w-full mx-auto flex justify-around items-center'>
                <div className='hidden md:flex'>
                    <img src={"/images/auth_hero.png"} width={400} height={400} alt='auth_hero' />
                </div>
                <div className=''>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default Register