import React from "react";

interface ButtonProps {
  text: string;
  styling?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${props.styling ? props.styling : ""} ${props.disabled
        ? "hover:cursor-default hover:bg-slate-500 bg-slate-500 text-white"
        : ""
        }`}
      onClick={!props.disabled ? props.onClick : () => { }}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
