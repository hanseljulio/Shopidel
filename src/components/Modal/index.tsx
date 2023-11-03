import React from "react";

interface IModalProps {
  content: JSX.Element;
}

const Modal = ({ content }: IModalProps) => {
  return (
    <dialog className="h-screen w-screen bg-black/50 flex justify-center items-center fixed">
      {content}
    </dialog>
  );
};

export default Modal;
