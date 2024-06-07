import { Field } from "formik";
import React, { FC, useState } from "react";
import Eye from "../../static/svg/eye";
import EyeSlash from "../../static/svg/eye-slash";

interface ITextFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  error: string | undefined;
  touched: boolean | undefined;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

const TextField: FC<ITextFieldProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  error,
  touched,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error && touched ? " is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <Field
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={getInputClasses()}
          {...rest}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
        {error && touched && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;
