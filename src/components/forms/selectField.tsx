import React, { ChangeEvent, FC } from "react";

interface ISelectedField {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  optionsList: Array<Record<string, string>>;
  label: string;
}

const SelectField: FC<ISelectedField> = ({
  value,
  onChange,
  name,
  optionsList,
  label
}) => {
  return (
    <div className="d-flex pb-3">
      <label htmlFor={name} className="text-nowrap px-3 py-3">
        {label}
      </label>
      <select
        id={name}
        className="form-select"
        value={value}
        onChange={onChange}
        name={name}
      >
        {optionsList.map((item) => (
          <option value={item.code} key={item.code}>
            {item.name} ({item.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
