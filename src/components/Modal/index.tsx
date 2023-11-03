import React, { ReactNode } from 'react'

interface IModalProps {
    content: JSX.Element
}

const Modal = ({ content }: IModalProps) => {
    return (
        <dialog className='h-screen w-screen bg-black/50 flex justify-center items-center'>
            {content}
        </dialog>
    )
}

export default Modal