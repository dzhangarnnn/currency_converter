import { Field, Form, Formik } from "formik";
import React from "react";
import { currenciesCodeList } from "../consts/currenciesCodeList";
import { useAuth } from "../hooks/useAuth";

const BaseCurrencyForm = () => {
  const { user, updateUser } = useAuth();

  return (
    <Formik
      initialValues={{
        baseCurrValue: user.baseCurrency
      }}
      onSubmit={(values, { setSubmitting }) => {
        updateUser({
          ...user,
          baseCurrency: values.baseCurrValue
        });
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
