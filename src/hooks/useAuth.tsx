import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import React from "react";
import {
  getIsAuthLocalStorage,
  removeIsAuthLocalStorage,
  setIsAuthLocalStorage
} from "../services/localStorageService";
import { ILogin, IRegister } from "../models/ILogin";
import { IUser } from "../models/IUser";
import { useCurrency } from "./useCurrency";

type ContextType = {
  user: IUser;
  isAuth: boolean;
  signUp: (values: IRegister) => string;
  logIn: (values: ILogin) => string;
  updateUser: (values: IUser) => void;
  logOut: () => void;
};

const AuthContext = createContext({} as ContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as IUser);
  const [isAuth, setIsAuth] = useState(Boolean(getIsAuthLocalStorage()));
  const { baseCurrency, setBaseCurrency } = useCurrency();

  useEffect(() => {
    if (isAuth) {
      const data = localStorage.getItem("currentUser");
      if (data) {
        const dataObj: IUser = JSON.parse(data);
        setUser({
          id: dataObj.id,
          baseCurrency: dataObj.baseCurrency,
          name: dataObj.name,
          surname: dataObj.surname,
          email: dataObj.email
        });
        setBaseCurrency(dataObj.baseCurrency);
      }
    }
  }, []);
  useEffect(() => {
    if (user.baseCurrency) {
      setBaseCurrency(user.baseCurrency);
    }
  }, [isAuth]);

  function signUp(values: IRegister) {
    let error = "";
    if (localStorage.getItem(values.email.toLowerCase())) {
      error = "Почта с таким названием уже существует!";
    } else {
      setIsAuth(true);
      const id = Date.now().toString();
      setUser({
        id,
        baseCurrency,
        name: values.name,
        surname: values.surname,
        email: values.email
      });
      localStorage.setItem(
        values.email.toLowerCase(),
        JSON.stringify({
          id,
          baseCurrency,
          ...values
        })
      );
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id,
          baseCurrency,
          ...values
        })
      );
      setIsAuthLocalStorage();
    }
    return error;
  }
  function logIn({ email, password }: ILogin) {
    let error = "";
    const data = localStorage.getItem(email.toLowerCase());
    if (data) {
      const dataObj: IUser = JSON.parse(data);
      if (dataObj.password === password) {
        setIsAuth(true);
        setUser({
          id: dataObj.id,
          baseCurrency: dataObj.baseCurrency,
          name: dataObj.name,
          surname: dataObj.surname,
          email: dataObj.email
        });
        localStorage.setItem("currentUser", JSON.stringify(dataObj));
        setIsAuthLocalStorage();
      } else {
        error = "Почта или пароль введены неверно!";
      }
    } else {
      error = "Почта или пароль введены неверно!";
    }

    return error;
  }

  function updateUser(values: IUser) {
    const data = localStorage.getItem(values.email.toLowerCase());
    if (data) {
      setUser(values);
      setBaseCurrency(values.baseCurrency);
      const dataObj: IUser = JSON.parse(data);
      localStorage.setItem(
        values.email.toLowerCase(),
        JSON.stringify({ ...values, password: dataObj.password })
      );
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...values, password: dataObj.password })
      );
    }
  }

  function logOut() {
    setIsAuth(false);
    setUser({} as IUser);
    removeIsAuthLocalStorage();
    localStorage.removeItem("currentUser");
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuth, signUp, logIn, updateUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const { user, isAuth, signUp, logIn, updateUser, logOut } =
    useContext(AuthContext);
  return { user, isAuth, signUp, logIn, updateUser, logOut };
};
