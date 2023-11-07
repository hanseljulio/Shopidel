interface DropdownProps {
  label: string;
  spacing?: string;
  labelStyle: string;
  width?: string;
  options: string[];
  value?: string;
  onChange?: (e: any) => void;
  flexLabel?: string;
}

const Dropdown = (props: DropdownProps) => {
  return (
    <div
      className={`dropdown-div ${props.flexLabel} ${
        props.spacing ? props.spacing : ""
      }`}
    >
      <p className={props.labelStyle}>{props.label}</p>
      <select
        className={`p-4 ${props.width} rounded`}
        name="category-dropdown"
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
