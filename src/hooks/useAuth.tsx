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

type ContextType = {
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
  };
  isAuth: boolean;
  signUp: (values: IRegister) => string;
  logIn: (values: ILogin) => string;
  logOut: () => void;
};

const AuthContext = createContext({} as ContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({} as IUser);
  const [isAuth, setIsAuth] = useState(Boolean(getIsAuthLocalStorage()));

  useEffect(() => {
    if (isAuth) {
      const data = localStorage.getItem("currentUser");
      if (data) {
        const dataObj = JSON.parse(data);
        setUser({
          id: dataObj.id,
          name: dataObj.name,
          surname: dataObj.surname,
          email: dataObj.email
        });
      }
    }
  }, []);

  function signUp(values: IRegister) {
    let error = "";
    if (localStorage.getItem(values.email.toLowerCase())) {
      error = "Почта с таким названием уже существует!";
    } else {
      setIsAuth(true);
      const id = Date.now().toString();
      setUser({
        id,
        name: values.name,
        surname: values.surname,
        email: values.email
      });
      localStorage.setItem(
        values.email.toLowerCase(),
        JSON.stringify({
          id,
          ...values
        })
      );
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id,
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

  function logOut() {
    setIsAuth(false);
    setUser({} as IUser);
    removeIsAuthLocalStorage();
    localStorage.removeItem("currentUser");
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const { user, isAuth, signUp, logIn, logOut } = useContext(AuthContext);
  return { user, isAuth, signUp, logIn, logOut };
};
