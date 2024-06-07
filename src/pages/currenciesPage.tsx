import { useQuery } from "@tanstack/react-query";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import httpService from "../services/currenciesService";
import { currenciesCodeList } from "../consts/currenciesCodeList";
import { useCurrency } from "../hooks/useCurrency";
import SelectField from "../components/forms/selectField";
import { orderBy } from "lodash";
import CurrenciesTable from "../components/currenciesTable";
import { IDataArr } from "../models/ICurrencies";
import LoadSpinner from "../components/loader";

export interface ISort {
  path: string;
  order: "asc" | "desc";
}

const CurrenciesPage = () => {
  const { baseCurrency } = useCurrency();
  const [currencyValue, setCurrencyValue] = useState(baseCurrency);
  const [sortBy, setSortBy] = useState<ISort>({
    path: "name",
    order: "asc"
  });

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryFn: () => httpService.getLatest(currencyValue),
    queryKey: ["currenciesList", currencyValue],
    staleTime: 1000 * 10
  });

  // useEffect(() => {
  //   refetch();
  // }, [currencyValue]);

  useEffect(() => {
    setCurrencyValue(baseCurrency);
  }, [baseCurrency]);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrencyValue(event.target.value);
  };

  const handleSort = (item: ISort) => {
    setSortBy(item);
  };
  const dataArr =
    isSuccess &&
    Object.keys(data).map((item) => ({
      name: item,
      value: data[item]
    }));
  const dataArrSorted =
    dataArr && (orderBy(dataArr, [sortBy.path], [sortBy.order]) as IDataArr[]);

  return (
    <div className="container col-sm-8 col-md-6 col-lg-4  bg-light  py-3 shadow-lg rounded">
      <SelectField
        value={currencyValue}
        onChange={handleChange}
        name="currency"
        label="Base currency"
        optionsList={currenciesCodeList}
      />
      {isError && (
        <div className="d-flex justify-content-center">
          Произошла ошибка, повторите позже.
        </div>
      )}
      {isLoading && <LoadSpinner />}
      {dataArrSorted && (
        <CurrenciesTable
          dataArrSorted={dataArrSorted}
          currencyValue={currencyValue}
          onSort={handleSort}
          selectedSort={sortBy}
        />
      )}
    </div>
  );
};

export default CurrenciesPage;
