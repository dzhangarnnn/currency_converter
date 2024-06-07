import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";

type ContextType = {
  baseCurrency: string;
  setBaseCurrency: React.Dispatch<React.SetStateAction<string>>;
};

const BaseCurrencyContext = createContext({} as ContextType);

export const BaseCurrencyContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [baseCurrency, setBaseCurrency] = useState("RUB");

  return (
    <BaseCurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      {children}
    </BaseCurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const { baseCurrency, setBaseCurrency } = useContext(BaseCurrencyContext);
  return { baseCurrency, setBaseCurrency };
};

export default BaseCurrencyContextProvider;
