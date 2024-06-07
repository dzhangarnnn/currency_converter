import { Field, Form, Formik } from "formik";
import React from "react";
import { useCurrency } from "../hooks/useCurrency";
import { currenciesCodeList } from "../consts/currenciesCodeList";

const BaseCurrencyForm = () => {
  const { baseCurrency, setBaseCurrency } = useCurrency();

  return (
    <Formik
      initialValues={{
        baseCurrValue: baseCurrency
      }}
      onSubmit={(values, { setSubmitting }) => {
        setBaseCurrency(values.baseCurrValue);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className="m-3">
          <Form>
            <div className="mb-4">
              <label htmlFor="baseCurrValue" className="form-label">
                From
              </label>
              <Field
                as="select"
                id="baseCurrValue"
                name="baseCurrValue"
                className="form-select"
              >
                {currenciesCodeList.map((curr) => (
                  <option value={curr.code} key={curr.code}>
                    {curr.name} ({curr.code})
                  </option>
                ))}
              </Field>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить базовую валюту
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default BaseCurrencyForm;
