import { SchemaOf, object, string } from "yup";

export interface ILogin {
  email: string;
  password: string;
}

export const UserLoginSchema: SchemaOf<ILogin> = object().shape({
  email: string()
    .required("Поле обязательно для заполнения!")
    .email("Некорректный email!"),
  password: string()
    .required("Поле обязательно для заполнения!")
    .min(8, "Пароль должен состоять миниум из 8 символов")
});

export interface IRegister {
  surname: string;
  name: string;
  email: string;
  password: string;
}

export const UserRegisterSchema: SchemaOf<IRegister> = object().shape({
  surname: string().required("Поле обязательно для заполнения!"),
  name: string().required("Поле обязательно для заполнения!"),
  email: string()
    .required("Поле обязательно для заполнения!")
    .email("Некорректный email!"),
  password: string()
    .required("Поле обязательно для заполнения!")
    .min(8, "Пароль должен состоять миниум из 8 символов")
});
