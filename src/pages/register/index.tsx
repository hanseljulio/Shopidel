import Image from 'next/image'
import React, { useState } from 'react'
import RegisterUserFirst from '../components/RegisterUserFirst'
import RegisterUserSecond from '../components/RegisterUserSecond'

const Register = () => {
    const [page, setPage] = useState<JSX.Element>(
        <RegisterUserFirst onNext={() => setPage(<RegisterUserSecond onSubmit={(data) => {
            console.log(data)
        }} />)} />
    )

    return (
        <div className=' h-screen flex justify-between items-center'>
            <div className='max-w-7xl w-full mx-auto flex justify-around items-center'>
                <div>
                    <Image src={"/auth_hero.png"} width={400} height={400} alt='auth_hero' />
                </div>
                <div className=''>
                    {page}
                </div>
            </div>
        </div>
    )
}

export default Register