import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  labelStyle?: string;
  type: string;
  name: string;
  placeholder?: string;
  width?: string;
  styling?: string;
  onChange?: (e: any) => void;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
  checked?: boolean;
}

const Input = (props: InputProps) => {
  return (
    <div className="input-div">
      <div
        className={`input-div-wrapper ${props.styling ? props.styling : ""}`}
      >
        <p className={`pb-[8px] text-medium ${props.labelStyle}`}>
          {props.label}
          <span className={`text-red-600 ${!props.required ? "hidden" : ""}`}>
            {" "}
            *
          </span>
        </p>
        <input
          className={`${styles.inputArea} ${props.width ? props.width : ""} ${
            props.disabled ? "bg-slate-400" : ""
          }`}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder ? props.placeholder : ""}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled ? true : false}
          required={!props.required ? false : true}
          pattern={props.pattern}
          checked={props.checked}
        />
      </div>
    </div>
  );
};

export default Input;
