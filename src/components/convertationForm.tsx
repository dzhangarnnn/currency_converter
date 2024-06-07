import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { currenciesCodeList } from "../consts/currenciesCodeList";
import { useCurrency } from "../hooks/useCurrency";

interface IConvertationFormProps {
  onSubmit: (amount: number, from: string, to: string) => Promise<void>;
  setIsActive: (arg: boolean) => void;
}

const ConvertationForm: FC<IConvertationFormProps> = ({
  onSubmit: handleSubmit,
  setIsActive
}) => {
  const { baseCurrency } = useCurrency();
  function validateCurrAmount(value: any) {
    let error;
    if (!value) {
      error = "Поле Amount обязательно для заполнения";
    } else if (isNaN(Number(value))) {
      error = "В поле Amount можно вводить только числовые значения";
    }
    return error;
  }

  return (
    <div>
      <Formik
        initialValues={{
          amount: 1,
          from: baseCurrency,
          to: baseCurrency === "USD" ? "RUB" : "USD"
        }}
        onSubmit={(values) => {
          if (values.from !== values.to) {
            handleSubmit(values.amount, values.from, values.to);
          }
        }}
      >
        {({ handleChange, errors, touched }) => (
          <Form>
            <div className="row align-items-center justify-content-center mb-3 shadow-lg rounded">
              <div className="col-9 col-md-2 pb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <Field
                  className="form-control"
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  validate={validateCurrAmount}
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    setIsActive(false);
                  }}
                />
              </div>
              <div className="col-9 col-md-4 pb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>
                <Field
                  as="select"
                  id="from"
                  name="from"
                  className="form-select"
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    setIsActive(false);
                  }}
                >
                  {currenciesCodeList.map((curr) => (
                    <option value={curr.code} key={curr.code}>
                      {curr.name} ({curr.code})
                    </option>
                  ))}
                </Field>
              </div>
              <div className="col-9 col-md-4 pb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>
                <Field
                  as="select"
                  id="to"
                  name="to"
                  className="form-select"
                  onChange={(e: React.ChangeEvent<any>) => {
                    handleChange(e);
                    setIsActive(false);
                  }}
                >
                  {currenciesCodeList.map((curr) => (
                    <option value={curr.code} key={curr.code}>
                      {curr.name} ({curr.code})
                    </option>
                  ))}
                </Field>
              </div>
              <div className="col-9 col-md-2 py-3 mt-3">
                <button type="submit" className="btn btn-primary">
                  Convert
                </button>
              </div>
            </div>
            {errors.amount && touched.amount ? (
              <span className="text-danger">{errors.amount}</span>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ConvertationForm;
