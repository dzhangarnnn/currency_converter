import React, { FC } from "react";
import { IConvertationResult } from "../models/ICurrencies";
import { currenciesCodeList } from "../consts/currenciesCodeList";

interface IConvertationResultProps {
  resultData: IConvertationResult;
}

const ConvertationResult: FC<IConvertationResultProps> = ({ resultData }) => {
  const currencyFrom = currenciesCodeList.filter(
    (curr) => curr.code === resultData.from
  )[0].name;
  const currencyTo = currenciesCodeList.filter(
    (curr) => curr.code === resultData.to
  )[0].name;
  const amount = Math.floor(resultData.amount * 10000) / 10000;
  const resultValue = Math.floor(resultData.resultValue * 1000) / 10000;
  return (
    <div className="text-center fs-3 pt-3">
      {amount} {currencyFrom}
      {amount !== 1 ? "s" : ""} = {resultValue} {currencyTo}
      {resultValue !== 1 ? "s" : ""}
    </div>
  );
};

export default ConvertationResult;
