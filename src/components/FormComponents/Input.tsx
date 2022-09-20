import { ErrorMessage, useField } from "formik";
import React from "react";

interface Props {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder: string;
  type?: string;
}
const Input: React.FC<Props> = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={props.name}
        className={`text-secondary text-base font-normal capitalize`}
      >
        {props.label}
        {props.isRequired ? <span className="text-red-400"> * </span> : null}
      </label>
      <div className="flex flex-row justify-between relative">
        <input
          className={`placeholder-gray-600 placeholder:capitalize border-2 border-boxBorder w-full h-10 p-2 pr-9 shadow-sm rounded-md text-secondary text-sm font-normal focus:outline-none focus:border-primary`}
          {...field}
          {...props}
          placeholder={props.placeholder}
          autoComplete="off"
        />
      </div>
      <span className="h-1">
        <ErrorMessage
          name={props.name}
          render={(err) => <span className="text-red-400 text-sm">{err}</span>}
        />
      </span>
    </div>
  );
};

export default Input;
