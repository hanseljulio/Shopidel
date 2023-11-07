import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

interface IModalProps {
  content: JSX.Element;
  onClose: () => void
}

const Modal = ({ content, onClose }: IModalProps) => {
  return (
    <dialog className="h-screen w-screen bg-black/50 flex justify-center items-center fixed z-50">
      <div className='p-5 bg-white rounded-md relative'>
        <div className='absolute top-2 right-2 hover:cursor-pointer' onClick={onClose}>
          <TiDeleteOutline size={20} />
        </div>
        {content}
      </div>
    </dialog>
  );
};

export default Modal;
