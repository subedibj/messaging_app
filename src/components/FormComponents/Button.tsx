import React from "react";
interface Props extends React.ButtonHTMLAttributes<any> {
  label: string | React.ReactNode;
  width?: string;
  labelIcon?: any;
  buttonType: "primary" | "secondary" | "border" | "danger" | "rowColor";
  customButtonClassName?: string;
}
const Button = ({
  label,
  labelIcon,
  customButtonClassName,
  width = " w-48",
  ...props
}: Props) => {
  let buttonClassName =
    "rounded-md shadow-md flex flex-row justify-center items-center gap-2";
  if (props.buttonType === "primary") {
    buttonClassName += ` focus:outline-none ${width} font-medium text-lg capitalize text-white bg-primary px-4 py-2`;
  }
  if (props.buttonType === "secondary") {
    buttonClassName += ` focus:outline-none ${width} font-medium text-lg capitalize text-white bg-secondary px-4 py-2`;
  }
  if (props.buttonType === "rowColor") {
    buttonClassName += ` focus:outline-none ${width} font-medium text-lg capitalize text-secondary border border-boxBorder bg-rowColor px-4 py-2`;
  }
  if (props.buttonType === "border") {
    buttonClassName += ` opacity-80 hover:opacity-100 text-primary focus:outline-none border-2 border-primary capitalize ${width} px-3 py-2 `;
  }
  if (props.buttonType === "danger") {
    buttonClassName = `focus:outline-none w-48 rounded-md shadow-md font-medium text-lg capitalize text-white bg-terminate ${width} px-4 py-2`;
  }

  let classes = `${buttonClassName} ${customButtonClassName}`;

  if (props.disabled) {
    classes += " opacity-50";
  }

  return (
    <div>
      <button {...props} className={`${classes}`}>
        {label}
        {labelIcon}
      </button>
    </div>
  );
};

export default Button;
