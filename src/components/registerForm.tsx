import { Form, Formik } from "formik";
import React, { useState } from "react";
import TextField from "./forms/textField";
import { IRegister, UserRegisterSchema } from "../models/ILogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values: IRegister) => {
    const err = signUp(values);
    if (err) {
      setError(err);
    } else {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: ""
      }}
      validationSchema={UserRegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched, handleChange }) => (
        <Form>
          <TextField
            label="Фамилия"
            name="surname"
            placeholder="Введите вашу фамилию"
            error={errors.surname}
            touched={touched.surname}
          />
          <TextField
            label="Имя"
            name="name"
            placeholder="Введите ваше имя"
            error={errors.name}
            touched={touched.name}
          />
          <TextField
            label="Электронная почта"
            name="email"
            placeholder="Введите ваш email"
            error={errors.email || error}
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
            error={errors.password}
            touched={touched.password}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-100 mx-auto"
          >
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
