import React from "react";

interface ButtonProps {
  text: string;
  styling?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  return (
    <div className="btn-div">
      <button
        className={`${props.styling ? props.styling : ""} ${
          props.disabled
            ? "hover:cursor-default bg-slate-400 text-white hover:bg-slate-400"
            : ""
        }`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
