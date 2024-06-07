import { Form, Formik } from "formik";
import React, { useState } from "react";
import TextField from "./forms/textField";
import { ILogin, UserLoginSchema } from "../models/ILogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values: ILogin) => {
    const err = logIn(values);
    if (err) {
      setError(err);
      console.log(error);
    } else {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={UserLoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched, handleChange }) => (
        <Form>
          <TextField
            label="Электронная почта"
            name="email"
            placeholder="Введите ваш email"
            error={errors.email}
            touched={touched.email}
            onChange={(e: React.ChangeEvent<any>) => {
              handleChange(e);
              setError("");
            }}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
            error={errors.password || error}
            touched={touched.password}
            onChange={(e: React.ChangeEvent<any>) => {
              handleChange(e);
              setError("");
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-100 mx-auto"
          >
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
