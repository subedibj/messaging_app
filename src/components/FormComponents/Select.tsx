import { ErrorMessage } from "formik";
import ReactSelect from "react-select";

interface SelectProps {
  options: any;
  name: string;
  label: string;
  formik: any;
  requiredLabel?: boolean;
  placeholder?: string;
}

const Select = ({
  options,
  label,
  name,
  formik,
  requiredLabel = false,
  placeholder,
}: SelectProps) => {
  const value = formik.values[name];
  return (
    <div className="flex flex-col w-full items-start gap-2 mt-4">
      <label
        htmlFor="reportType"
        className={`text-secondary text-base font-normal capitalize`}
      >
        {label}
        {requiredLabel ? <span className="text-red-400"> * </span> : null}
      </label>
      <ReactSelect
        className=" w-full text-lg rounded-md"
        name="reportType"
        placeholder={placeholder || "Select report type"}
        value={value}
        onChange={(property) => {
          formik.setFieldValue(name, property);
        }}
        options={options}
      />
      <span className="h-1">
        <ErrorMessage
          name={name}
          render={(err) => <span className="text-red-400 text-sm">{err}</span>}
        />
      </span>
    </div>
  );
};

export default Select;
